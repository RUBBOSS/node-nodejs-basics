const http = require('http');
const dotenv = require('dotenv');
const { handleRequest } = require('./src/routes/user.routes');

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
