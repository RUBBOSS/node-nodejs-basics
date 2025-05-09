const url = require('url');
const userController = require('../controllers/user.controller');

const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const parsedBody = body ? JSON.parse(body) : {};
          resolve(parsedBody);
        } catch (error) {
          reject(new Error('Invalid JSON in request body'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleRequest = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    res.setHeader('Content-Type', 'application/json');

    if (trimmedPath === 'api/users') {
      if (req.method === 'GET') {
        userController.getAllUsers(req, res);
      } else if (req.method === 'POST') {
        const userData = await getRequestData(req);
        userController.createUser(req, res, userData);
      } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ message: 'Method not allowed' }));
      }
    } else if (trimmedPath.startsWith('api/users/')) {
      const userId = trimmedPath.split('/')[2];

      if (req.method === 'GET') {
        userController.getUserById(req, res, userId);
      } else if (req.method === 'PUT') {
        const userData = await getRequestData(req);
        userController.updateUser(req, res, userId, userData);
      } else if (req.method === 'DELETE') {
        userController.deleteUser(req, res, userId);
      } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ message: 'Method not allowed' }));
      }
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
};

module.exports = { handleRequest };
