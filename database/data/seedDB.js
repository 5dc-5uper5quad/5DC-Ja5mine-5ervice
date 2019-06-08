var gamesData = require('./gamesData');
var { Games, db } = require('../index');
//postgres insert method 
var seed = (numDocs = 100) => {
  gamesData.getData(numDocs, (docs)=>{
    Games.insertMany(docs, function (err, results) {
      if (err) return console.error(err);
      console.log('Inserted into DB!');
      db.close();
    });
  });
}

seed();