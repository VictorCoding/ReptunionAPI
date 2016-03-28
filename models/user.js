'use strict';

class User {
  constructor(database) {
    this.db = database;
  }

  getAllUsers(callback) {
    this.db.query('SELECT * FROM Users', null, (err, result) => {
      // TODO: log err
      if (err) throw err;
      callback(result);
    });
  }

  insertUser(user, callback) {
    this.db.query('INSERT INTO Users values($1, $2)', [user.username, user.password], (err, result) => {
      // TODO: log err
      if (err) throw err;
      callback(result);
    });
  }
}

module.exports = User;
