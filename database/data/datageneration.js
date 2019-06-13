const faker = require('faker');
const AWS = require('aws-sdk');
const { Parser } = require('json2csv');
const s3 = new AWS.S3();
const fs = require("fs");

const gameTypes = ['farm','fps','car', 'food', 'casino', 'puzzle', 'sports', 'board', 'alien', 'medieval'];
const OS = ['windows', 'mac', 'linux'];
const reviewsOverall = ['very positive', 'mostly positive', ' positive', 'mixed', 'negative', 'mostly negative', 'very negative'];

//Should create fake data and insert it into the mockData.csv file 

async function createCSVData () {
  //create a json object
  var Games = [];
  for (let i = 0; i < 100000; i++) {
    const gameJSON = 
      {
        "game_id": i,
        "game_name": faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun(),
        "game_type": gameTypes[Math.floor(Math.random() * gameTypes.length)],
        "original_price": faker.commerce.price(0,200,2),
        "reviews": reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)],
      }
    Games.push(gameJSON);
  };
  //create headers for the csv file and parse to csv
  const fields = ['game_id', 'game_name', 'game_type', 'original_price', 'reviews'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(Games);
  //append csv data into mockData.csv
  fs.appendFile('mockData.csv', csv, (err) => {
    if (err) { 
      console.log(err)
    } else {
      console.log("Successfully Written to mockData file!");
    }
  });
};
  //promise for csv needs a catch instance
  createCSVData().then(function (results) {
    console.log("CSV files successfully created and added!");
  })
  .catch(function () {
    console.log("CSV files were not successfully created or added");
  });

  // var queryStr = `COPY games FROM '/Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/mockData.csv' DELIMITER ',' CSV HEADER`
  async function batchData () {
    var start = Date.now();
    console.log('starting to batch Data....');
    for (let i = 0; i < 100; i++) {
      console.log(i);
      await createCSVData();
    }
    var millis = Date.now() - start;
    console.log("seconds elapsed = " + Math.floor(millis/1000));
  };
  //how do I run the queryStr in the database on each iteration

batchData();

module.exports.createCSVData = createCSVData;