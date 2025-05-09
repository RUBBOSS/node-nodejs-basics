const cluster = require('cluster');
const http = require('http');
const { availableParallelism } = require('os');
const process = require('process');
const dotenv = require('dotenv');
const url = require('url');

dotenv.config();

const BASE_PORT = parseInt(process.env.PORT) || 4000;

const numCPUs = availableParallelism();

const workers = [];

let currentWorker = 0;

let sharedData = {
  users: [],
};

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Available parallelism: ${numCPUs}`);

  const workerCount = Math.max(1, numCPUs - 1);

  for (let i = 0; i < workerCount; i++) {
    const worker = cluster.fork({
      WORKER_PORT: BASE_PORT + i + 1,
      WORKER_ID: i + 1,
    });

    workers.push({
      id: i + 1,
      port: BASE_PORT + i + 1,
      process: worker,
    });

    worker.on('message', (message) => {
      if (message.type === 'UPDATE_USERS') {
        sharedData.users = message.data;

        broadcastToWorkers('SYNC_USERS', sharedData.users);
      }
    });
  }

  console.log(`Load balancer running on port ${BASE_PORT}`);
  console.log(`Workers running on ports: ${workers.map((w) => w.port).join(', ')}`);

  http
    .createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);

      const worker = workers[currentWorker];

      currentWorker = (currentWorker + 1) % workers.length;

      console.log(`Load balancer: Routing request to worker ${worker.id} on port ${worker.port}`);

      forwardRequest(req, res, worker.port);
    })
    .listen(BASE_PORT);

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);

    const deadWorkerIndex = workers.findIndex((w) => w.process.process.pid === worker.process.pid);

    if (deadWorkerIndex !== -1) {
      const deadWorker = workers[deadWorkerIndex];

      const newWorker = cluster.fork({
        WORKER_PORT: deadWorker.port,
        WORKER_ID: deadWorker.id,
      });

      workers[deadWorkerIndex] = {
        id: deadWorker.id,
        port: deadWorker.port,
        process: newWorker,
      };

      newWorker.on('message', (message) => {
        if (message.type === 'UPDATE_USERS') {
          sharedData.users = message.data;
          broadcastToWorkers('SYNC_USERS', sharedData.users);
        }
      });

      newWorker.send({
        type: 'SYNC_USERS',
        data: sharedData.users,
      });
    }
  });
} else {
  const workerPort = parseInt(process.env.WORKER_PORT);
  const workerId = parseInt(process.env.WORKER_ID);

  console.log(`Worker ${process.pid} (ID: ${workerId}) started on port ${workerPort}`);

  const { handleRequest } = require('./routes/user.routes');

  http
    .createServer((req, res) => {
      console.log(`Worker ${workerId} handling request: ${req.url}`);
      handleRequest(req, res);
    })
    .listen(workerPort);

  process.on('message', (message) => {
    if (message.type === 'SYNC_USERS') {
      const User = require('./models/user.model');
      User.syncUsers(message.data);
    }
  });
}

function forwardRequest(req, res, targetPort) {
  const options = {
    hostname: 'localhost',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });

  proxyReq.on('error', (e) => {
    console.error(`Problem with request to worker: ${e.message}`);
    res.statusCode = 500;
    res.end('Internal Server Error');
  });
}

function broadcastToWorkers(type, data) {
  for (const worker of Object.values(cluster.workers)) {
    worker.send({ type, data });
  }
}
