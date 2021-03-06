const nr = require('newrelic');
const express = require('express');
// var { Games } = require('../database/index');
const bodyParser = require('body-parser');
const pgdb = require('../database/postgres');
const models = require('../models/index');


let app = express();
const port = 3003;
var router = require('../routes');

app.use(express.static(__dirname+'/../client/dist'));

// app.get('/games/:gameid', (req, res) => {
//   let id = req.params.gameid;
//   Games.find({ game_id: id }).limit(1).exec((err, queryResults) => {
//     res.json(queryResults[0]);
//   });
// });

app.get('/games/:gameid', (req, res) => {
  let id = req.params.gameid;
  var queryString = `SELECT * FROM games WHERE game_id = $1`;
    pgdb.one(queryString, id)
      .then(function(data) {
        //console.log('Game succssfully selected!', data);
        res.json(data);
      })
      .catch(function(error) {
        //console.log('There was an error with the game request!', error);
      });
});


app.get('/dlcs', (req, res) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  var secondNum = getRandomArbitrary(5, 500000);
  var firstNum = secondNum - getRandomArbitrary(1, 5);
  var queryDlc = `SELECT * FROM dlcs WHERE game_id BETWEEN $1 AND $2`;
  pgdb.any(queryDlc, [firstNum, secondNum])
  .then(function(data) {
    //console.log('DLC succssfully selected!', data);
    res.json(data);
  })
  .catch(function(error) {
    //console.log('There was an error with the DLC request!', error);
  });
})

//post new game 
app.post('/games'), (req, res) => {
  console.log('Req body post', req.body);
  var body = req.body;
  var queryString = `INSERT INTO games(id, doc) VALUES(${this})`;
    pgdb.none(queryString, body)
      .then(function(data) {
        console.log('Game succssfully selected!', data);
        res.json(data);
      })
      .catch(function(error) {
        console.log('There was an error with the game request!', error);
      });
};

//update game based onid
app.put('/games/:gameid'), (req, res) => {
  console.log('Req body update', req.body);
  let id = req.params.gameid;

  Games.find({ game_id: id }, (err, data) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      res.status(200);
      //reurn updated game data
      res.json(data);
    }
  })
  
};

//delete game based on ID
app.delete('/games/:gameid'), (req, res) => {
  console.log('Req body delete', req.body);
  let id = req.params.gameid;
  Games.delete({ game_id: id }, (err, data) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      //return deleted game data
      res.json(data);
      res.status(200);
    }
  })
};


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});