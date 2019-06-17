const faker = require('faker');
const fs = require("fs");
const gamesFile = fs.createWriteStream('mockDataGames.csv');
const dlcFile = fs.createWriteStream('mockDataDlcs.csv');
var { getImageURLs } = require('./imagesAWS');

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
const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
const OS = ['windows', 'mac', 'linux'];
const reviewsOverall = ['very positive', 'mostly positive', ' positive', 'mixed', 'negative', 'mostly negative', 'very negative'];

//Should create fake data and insert it into the mockData.csv file 
function createCSVData() {
  //create a json object
  const gameColumns = `"game_id", "game_name", "game_type", "original_price", "reviews", "os" \n`;
  const dlcColumns = `"dlc_name", "price", "release_date", "user_reviews_num", "user_tags", "images", "game_id" \n`;

  var start = Date.now();
  console.log('starting to batch Data....');
  gamesFile.write(gameColumns);
  dlcFile.write(dlcColumns);
  // 1 million entries right here
  for (let i = 0; i < 500000; i++) {
    gamesFile.write(`${i},"${faker.commerce.productAdjective() + ' ' + faker.company.catchPhraseNoun()}","${gameTypes[Math.floor(Math.random() * gameTypes.length)]}","${faker.commerce.price(0, 200, 2)}","${reviewsOverall[Math.floor(Math.random() * reviewsOverall.length)]}","${OS[Math.ceil(Math.random() * OS.length - 1)]}"\n`);
      //Having issues with AWS, will come back to it- but first want to create my endpoints and continue on with stress testing!
      // var imageURLs = {};
      // getImageURLs((data) => {
      //   imageURLs = data;
      //   var randIMGnum = Math.floor(Math.random() * imageURLs[gameType].length);
      //   var bottomIndex = 0;
      //   var images = [];
      //   for (var k = 0; k <= randIMGnum; k++) {
      //     var randIndex = bottomIndex + Math.floor(Math.random() * (imageURLs[gameType].length - bottomIndex));
      //     var temp = imageURLs[gameType][randIndex];
      //     imageURLs[gameType][randIndex] = imageURLs[gameType][bottomIndex];
      //     imageURLs[gameType][bottomIndex] = temp;
      //     images.push(imageURLs[gameType][bottomIndex]);
      //     bottomIndex++;
      //   }
        dlcFile.write(`"${faker.commerce.productAdjective() + ' - ' + faker.lorem.words(3)}","${faker.commerce.price(0,200,2)}","${faker.date.recent(600).toDateString().substr(4)}","${faker.random.number(2000)}","${user_tags[gameType]}","${'https://picsum.photos/200/300'}", ${i}\n`);
      // });
    };
  var millis = Date.now() - start;
  console.log("seconds elapsed = " + Math.floor(millis/1000));
};
createCSVData();

module.exports.createCSVData = createCSVData;