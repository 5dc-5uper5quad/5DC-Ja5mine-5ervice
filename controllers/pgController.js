var seeder = require('../database/data/datageneration');
var pgdb = require('../database/pgIndex');

module.exports = {

  get: function(callback) {
    
  }

}
// TODO:

// 1 create smaller chunks of data, send to DB
// 2 loop through, killing current csv file, making a new csv file with data, then sending it again.
// 3 repeat (edited) 

//COPY games FROM 'mockData.csv' DELIMITER ',' 


// INSERT INTO games VALUES(1, 'Stardew Valley', 'Farming', 9.99, 30, 'Mac');

// INSERT INTO dlc VALUES('Stardew Valley', 2.99, 'great game', 1, 'relaxing', 'S3 url', );
