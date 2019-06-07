const faker = require('faker');
const AWS = require('aws-sdk');
const { Parser } = require('json2csv');
const s3 = new AWS.S3();
const fs = require("fs");

const gameTypes = ['farm','fps','car', 'food', 'casino', 'puzzle', 'sports', 'board', 'alien', 'medieval'];
const OS = ['windows', 'mac', 'linux'];
const reviewsOverall = ['very positive', 'mostly positive', ' positive', 'mixed', 'negative', 'mostly negative', 'very negative'];

//Should create fake data and insert it into the mockData.csv file 

async function createCSVData (filename, iteration) {
  //create a simple games object with the following data, in a stringified format 
  const Games = [];
  for (var i = 0; i < iteration; i++) {
    const gameJSON = 
      {
        "game_id": i,
        "game_name": faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun(),
        "game_type": gameTypes[Math.floor(Math.random() * gameTypes.length)],
        "original_price": faker.commerce.price(0,200,2),
        "reviews": reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)]
      }
    Games.push(gameJSON);
  }
  //using a stream to create JSON data to add into a CSV 
  const fields = ['game_id', 'game_name', 'game_type', 'original_price', 'reviews'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(Games);

  fs.writeFile(filename, csv, (err) => {
    if (err) { 
      console.log(err)
    } else {
      console.log("Successfully Written to mockData file!");
    }
  });
  return csv;
}

const csvData = createCSVData('mockData.csv', 1000000);

csvData.then(function (results) {
  console.log("CSV files successfully created and added!");
  console.log(results);
}).catch(function () {
  console.log("CSV files were not successfully created or added.");
});

async function batchData () {
  const iteration = 5;
  for (let i = 0; i < iteration; i++) {
    await csvData();
  }
  console.log('Database successfully seeded!')
}
