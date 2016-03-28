'use strict';

const UserModel = require('../models/user');

class UserController {
  constructor(database) {
    this.userModel = new UserModel(database);
  }

  listAllUsers(request, reply) {
    this.userModel.getAllUsers(response => {
      reply(response).code(200);
    });
  }

  createUser(request, reply) {
    this.userModel.insertUser(request.payload, response => {
      reply(response).code(200);
    });
  }
}

module.exports = UserController;
