const faker = require('faker');
const { Parser } = require('json2csv');
const fs = require("fs");
const file = fs.createWriteStream('mockDataGames.csv');

const gameTypes = ['farm','fps','car', 'food', 'casino', 'puzzle', 'sports', 'board', 'alien', 'medieval'];
const OS = ['windows', 'mac', 'linux'];
const reviewsOverall = ['very positive', 'mostly positive', ' positive', 'mixed', 'negative', 'mostly negative', 'very negative'];

//Should create fake data and insert it into the mockData.csv file 
function createCSVData () {
  //create a json object
  const gameColumns = ['game_id','game_name', 'game_type', 'original_price', 'reviews', 'os'];

  for (let i = 0; i < 100000; i++) { 
    file.write(`${i},"${faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun()}","${gameTypes[Math.floor(Math.random() * gameTypes.length)]}","${faker.commerce.price(0,200,2)}","${reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)]}","${OS[Math.ceil(Math.random() * OS.length - 1)]}"\n`);
  };
    //create headers for the csv file and parse to csv
  //not worth it
  //can create this myself CSV 
  //fs.createWriteStream **
  //batch it -- generate a string and push it into a file 
  //line by line 
  //not it all at once 
  console.log("CSV files were not successfully created or added");
};

  //promise for csv needs a catch instance
  // createCSVData().then(function (results) {
  //   console.log("CSV files successfully created and added!");
  // })
  // .catch(function () {
  //   console.log("CSV files were not successfully created or added");
  // });

  // add to games table in psql shell `COPY games FROM '/Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/mockDataGames.csv' DELIMITER ',' CSV HEADER`
  async function batchData () {
    var start = Date.now();
    console.log('starting to batch Data....');
    for (let i = 0; i < 1; i++) {
      console.log(i);
      await createCSVData();
    }
    var millis = Date.now() - start;
    console.log("seconds elapsed = " + Math.floor(millis/1000));
  };
  //how do I run the queryStr in the database on each iteration

batchData();

module.exports.createCSVData = createCSVData;