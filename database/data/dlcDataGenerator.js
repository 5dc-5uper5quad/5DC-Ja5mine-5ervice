const faker = require('faker');
var { getImageURLs, getLogoURLs } = require('./imagesAWS');
const { Parser } = require('json2csv');
const fs = require("fs");

var gameTypes = ['farm','fps','car', 'food', 'casino', 'puzzle', 'sports', 'board', 'alien', 'medieval'];
var user_tags = {
  farm: ['story-rich', 'simulation'],
  fps: ['fps', 'first-person', 'shooter'],
  car:['racing'],
  food: ['strategy', 'family'],
  casino: ['retro', 'arcade', 'card'],
  puzzle: ['puzzle', 'strategy'],
  sports: ['sports'],
  board: ['2D', 'strategy'],
  alien: ['sci-fi', 'space'],
  medieval: ['magic', 'dragons']
};
//Should create fake data and insert it into the mockData.csv file 

async function createCSVDLCData () {
  // Get a random subset of images of the proper game type
  var imageURLs = {};
  getImageURLs((data) => {

  imageURLs = data;
  var gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
  var randIMGnum = Math.floor(Math.random() * imageURLs[gameType].length);
  var bottomIndex = 0;
  var images = [];
  for (var k = 0; k <= randIMGnum; k++) {
    var randIndex = bottomIndex + Math.floor(Math.random() * (imageURLs[gameType].length - bottomIndex));
    var temp = imageURLs[gameType][randIndex];
    imageURLs[gameType][randIndex] = imageURLs[gameType][bottomIndex];
    imageURLs[gameType][bottomIndex] = temp;
    images.push(imageURLs[gameType][bottomIndex]);
    bottomIndex++;
  }
  var dlcs = [];
  //here we are iterating over 100,000 times to create the necessary JSON data
  for (let i = 0; i < 100000; i++) {
    var gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    const dlcJSON = 
      {
        "dlc_name": faker.commerce.productAdjective() + ' - ' + faker.lorem.words(3),
        "price": faker.commerce.price(0,200,2),
        "release_date": faker.date.recent(600).toDateString().substr(4),
        "user_reviews_num": faker.random.number(2000),
        "user_tags": user_tags[gameType],
        "images": images
      }
    dlcs.push(dlcJSON);
  };
    //create headers for the csv file and parse to csv
    const fields = ['dlc_name', 'price', 'release_date', 'user_reviews_num', 'user_tags','images'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dlcs);
    //append csv data into mockData.csv
    fs.appendFile('mockDataDlc.csv', csv, (err) => {
      if (err) { 
        console.log(err)
      } else {
        console.log("Successfully Written to mockData file!");
      }
    });
  });
};
  //promise for csv needs a catch instance
  createCSVDLCData().then(function (results) {
    console.log("CSV files successfully created and added!");
  })
  .catch(function () {
    console.log("CSV files were not successfully created or added");
  });

  // add to dlc table in psql shell `COPY dlc FROM '/Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/mockDataDlc.csv' DELIMITER ',' CSV HEADER`
  async function batchDataNow () {
    var start = Date.now();
    console.log('starting to batch Data....');
    for (let i = 0; i < 20; i++) {
      console.log(i);
      await createCSVDLCData();
    }
    var millis = Date.now() - start;
    console.log("seconds elapsed = " + Math.floor(millis/1000));
  };
  //how do I run the queryStr in the database on each iteration

batchDataNow();

module.exports.createCSVDLCData = createCSVDLCData;