const models = require('../models/index');

module.exports = {

  games: {
      get: function (req, res) {
        models.get(function(err, results) {
          if (err) { 
            throw err;
          }
          res.json(results);
        });
      },

      post: function (req, res) {
        var params = [req.body.game_name, req.body.game_type, req.body.original_price, req.body.reviews, req.body.os];
        models.post(params, function(err, results) {
          if (err) { 
            throw err;
          }
          res.sendStatus(201);
        });
      }
  }

}