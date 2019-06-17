var controller = require('./controllers/index');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/games/:gameid', controller.games.get);

router.post('/games', controller.games.post);

module.exports = router;