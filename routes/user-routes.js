'use strict';

const UserController = require('../controllers/user-controller');

exports.register = (server, options, next) => {
  const userController = new UserController(options.database);

  server.bind(userController);

  server.route([{
    method: 'GET',
    path: '/api/users',
    config: {
      handler: userController.listAllUsers,
    },
  }, {
    method: 'POST',
    path: '/api/user',
    config: {
      handler: userController.createUser,
    },
  }]);

  next();
};

exports.register.attributes = {
  name: 'user-routes',
};
