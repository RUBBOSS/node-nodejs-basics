const User = require('../models/user.model');

const userController = {
  getAllUsers: (req, res) => {
    const users = User.getAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  },

  getUserById: (req, res, userId) => {
    if (!User.isValidId(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
      return;
    }

    const user = User.getById(userId);

    if (!user) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  },

  createUser: (req, res, userData) => {
    if (!userData || !userData.username || userData.age === undefined) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
      return;
    }

    const newUser = User.create(userData);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newUser));
  },

  updateUser: (req, res, userId, userData) => {
    if (!User.isValidId(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
      return;
    }

    const updatedUser = User.update(userId, userData);

    if (!updatedUser) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(updatedUser));
  },

  deleteUser: (req, res, userId) => {
    if (!User.isValidId(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
      return;
    }

    const isDeleted = User.delete(userId);

    if (!isDeleted) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    res.statusCode = 204;
    res.end();
  },
};

module.exports = userController;
