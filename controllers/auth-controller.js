'use strict';

class AuthController {
  constructor(database) {
    this.db = database;
  }
  
  login(request, reply) {
    const username = request.payload.username;
    const password = request.payload.password;
    
    this.db.query('SELECT username FROM Users WHERE username = $1 AND password = $2', [username, password], (err, result) => {
      if (err) return reply(err).code(500);
      
      if (!result.rows.length) return reply().code(404);
      
      return reply().code(200);
    });
  }
  
  signUp(request, reply) {
    const username = request.payload.username;
    const password = request.payload.password;
    
    // first check if the username isnt taken yet.
    // if not, create new user in callback.
    this.db.query('SELECT username FROM Users WHERE username = $1', [username], (err, result) => {
      // TODO: add proper exception logging.
      if (err) return reply(err).code(500);
      
      const isTaken = result.rows.length;
      
      if (isTaken) return reply().code(406);
      
      this.db.query('INSERT INTO Users(username, password) Values($1, $2)', [username, password], (err, result) => {
        // TODO: log err
        if (err) console.log('err inserting user', err);
        return reply(result).code(200);
      });
    });
  }
}

module.exports = AuthController;