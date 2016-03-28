'use strict';

const Hapi = require('hapi');
const Database = require('./database');

const server = new Hapi.Server();
const db = new Database();

server.connection({
  port: process.env.PORT || 5000,
});

const plugins = [
  {
    register: require('./routes/user-routes.js'),
    options: {
      database: db,
    },
  },
  {
    register: require('./routes/auth-routes.js'),
    options: {
      database: db,
    },
  }
];

server.register(plugins, err1 => {
  // TODO: Log err1
  if (err1) throw err1;

  server.start(err2 => {
    // TODO: log err2
    if (err2) throw err2;
    console.log('Server running at: ' + server.info.uri);
  });
});
