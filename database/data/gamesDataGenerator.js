const faker = require('faker');
const fs = require("fs");
const gamesFile = fs.createWriteStream('mockDataGames.csv');
const dlcFile = fs.createWriteStream('mockDataDlcs.csv');
// var { getImageURLs, getLogoURLs } = require('./imagesAWS');

var user_tags = {
  farm: ['story-rich', 'simulation'],
  fps: ['fps', 'first-person', 'shooter'],
  car: ['racing'],
  food: ['strategy', 'family'],
  casino: ['retro', 'arcade', 'card'],
  puzzle: ['puzzle', 'strategy'],
  sports: ['sports'],
  board: ['2D', 'strategy'],
  alien: ['sci-fi', 'space'],
  medieval: ['magic', 'dragons']
};
const gameTypes = ['farm', 'fps', 'car', 'food', 'casino', 'puzzle', 'sports', 'board', 'alien', 'medieval'];
const OS = ['windows', 'mac', 'linux'];
const reviewsOverall = ['very positive', 'mostly positive', ' positive', 'mixed', 'negative', 'mostly negative', 'very negative'];

//Should create fake data and insert it into the mockData.csv file 
function createCSVData() {
  //create a json object
  const gameColumns = `"game_id", "game_name", "game_type", "original_price", "reviews", "os" \n`;
  var start = Date.now();
  var millis = Date.now() - start;
  console.log('starting to batch Data....');
  gamesFile.write(gameColumns);
  // 1 million entries right here
  for (let i = 0; i < 100000; i++) {
    gamesFile.write(`${i},"${faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun()}","${gameTypes[Math.floor(Math.random() * gameTypes.length)]}","${faker.commerce.price(0, 200, 2)}","${reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)]}","${OS[Math.ceil(Math.random() * OS.length - 1)]}"\n`);

    var imageURLs = {};
    getImageURLs((data) => {
      const dlcColumns = `"dlc_name", "price", "release_date", "user_reviews_num", "user_tags", "images", "game_id"`;
      const fields = ['dlc_name', 'price', 'release_date', 'user_reviews_num', 'user_tags','images'];

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
      dlcFile.write(`"${faker.commerce.productAdjective() + ' - ' + faker.lorem.words(3)}","faker.commerce.price(0,200,2)}","${faker.commerce.price(0, 200, 2)}","${faker.random.number(2000)}","${user_tags[gameType]}",${images}, ${i}\n`);
    });
  };
};
createCSVData();

// console.log('first batch has been done-erino');
// console.log("seconds elapsed = " + Math.floor(millis/1000));
// for (let j = 5000000; j < 10000000; j++) { 
//   file.write(`${j},"${faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun()}","${gameTypes[Math.floor(Math.random() * gameTypes.length)]}","${faker.commerce.price(0,200,2)}","${reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)]}","${OS[Math.ceil(Math.random() * OS.length - 1)]}"\n`);
// };
//create headers for the csv file and parse to csv
//not worth it
//can create this myself CSV 
//fs.createWriteStream **
//batch it -- generate a string and push it into a file 
//line by line 
//not it all at once 

// add to games table in psql shell `COPY games FROM '/Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/mockDataGames.csv' DELIMITER ',' CSV HEADER`
//   async function batchData () {
//     var start = Date.now();
//     console.log('starting to batch Data....');
//     for (let i = 0; i < 2; i++) {
//       console.log(i);
//       await createCSVData();
//     }
//     var millis = Date.now() - start;
//     console.log("seconds elapsed = " + Math.floor(millis/1000));
//   };
//   //how do I run the queryStr in the database on each iteration

// batchData();

module.exports.createCSVData = createCSVData;