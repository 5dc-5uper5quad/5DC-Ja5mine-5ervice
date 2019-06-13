const express = require('express');
var { Games } = require('../database/index');
const bodyParser = require('body-parser');

let app = express();
const port = 3003;


app.use(express.static(__dirname+'/../client/dist'));

app.get('/games/:gameid', (req, res) => {
  let id = req.params.gameid;
  Games.find({ game_id: id }).limit(1).exec((err, queryResults) => {
    res.json(queryResults[0]);
  });
});

//post new game 
app.post('/games'), (req, res) => {
  console.log('Req body post', req.body);

  const newGame = new Games(req.body);
  newGame.save((err) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      res.status(201);
    }
  })
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