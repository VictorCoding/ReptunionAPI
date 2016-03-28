'use strict';

const postgres = require('pg');
const connectionString = 'postgres://daaiyjmvleaexa:8mHZXeGOXZEP2gL3bOI76Isxjp@ec2-54-235-246-67.compute-1.amazonaws.com:5432/da6iomdlsvmk68?ssl=true';

class Database {
  constructor() {
    this.connStr = connectionString;
  }

  query(sql, params, callback) {
    postgres.connect(this.connStr, (err1, client, done) => {
      // TODO: Log err1
      if (err1) throw err1;
      client.query(sql, params, (err2, result) => {
        done();
        callback(err2, result);
      });
    });
  }
}

module.exports = Database;
