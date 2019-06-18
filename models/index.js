const db = require('../database/postgres');

module.exports = {

  get: function() {
    var queryString = 'SELECT * FROM games WHERE game_id = $1';
    db.one(queryString)
      .then(function(data) {
        console.log('Game succssfully selected!', data);
      })
      .catch(function(error) {
        console.log('There was an error with the game request!', error);
      });
  },

  post: function() {
    var queryString = 'INSERT INTO games(name, active) VALUES($1, $2)';
    db.none(queryString, ['John', true])
      .then(() => {
        console.log('Game succssfully posted!', data);
      })
      .catch(error => {
        console.log('There was an error with posting a game!', error);
      });
  }
  // update: function(callback) {
  //   var queryString = 'INSERT INTO games(name, active) VALUES($1, $2)';
  //   db.none(queryString, ['John', true])
  //   .then(() => {
  //     console.log('Game succssfully updated!', data);
  //   })
  //   .catch(error => {
  //     console.log('There was an error with updating a game!', error);
  //   });
  // },

  // delete: function(callback) {
  //   var queryString = 'select * from users where active = $1';
  //   db.any(queryString, function(err, results) {
  //     callback(err, results)
  //   })
  // }
};