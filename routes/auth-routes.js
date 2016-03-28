const AuthController = require('../controllers/auth-controller');

exports.register = (server, options, next) => {
  const authController = new AuthController(options.database);

  server.bind(authController);

  server.route([
    {
      method: 'POST',
      path: '/api/login',
      config: {
        handler: authController.login,
      },
    }, 
    {
      method: 'POST',
      path: '/api/signup',
      config: {
        handler: authController.signUp,
      },
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'auth-routes',
};