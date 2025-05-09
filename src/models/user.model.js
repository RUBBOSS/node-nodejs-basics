const { v4: uuidv4 } = require('uuid');

let users = [];

class User {
  constructor({ username, age, hobbies = [] }) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  static getAll() {
    return users;
  }

  static getById(id) {
    return users.find((user) => user.id === id);
  }

  static create(userData) {
    const newUser = new User(userData);
    users.push(newUser);

    this.notifyChanges();

    return newUser;
  }

  static update(id, userData) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    const updatedUser = { ...users[userIndex], ...userData, id };
    users[userIndex] = updatedUser;

    this.notifyChanges();

    return updatedUser;
  }

  static delete(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);

    this.notifyChanges();

    return true;
  }

  static isValidId(id) {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(id);
  }

  static syncUsers(userData) {
    users = userData;
    return users;
  }

  static notifyChanges() {
    if (process.send && typeof process.send === 'function') {
      process.send({
        type: 'UPDATE_USERS',
        data: users,
      });
    }
  }
}

module.exports = User;
