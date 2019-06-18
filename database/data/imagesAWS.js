var AWS = require('aws-sdk');

AWS.config.loadFromPath(__dirname+'/awsconfig.json');

var s3 = new AWS.S3();

// Helper function to seed database
// Gets all images URLs for DLC content from AWS
var getImageURLs = function(cb) {

  var urls = {};

  var params = { Bucket: 'sdcexhaustpurchaseoptions' };
  s3.listObjects(params, function (err, data) {
    if (err) return console.error('err:', err);
    var bucketContents = data.Contents;

    async function getSignedUrl(key) {
      return new Promise((resolve, reject) => {
        let params = { Bucket: 'sdcexhaustpurchaseoptions', Key: key, Expires: 604800 }; // max expiration allowed 7 days
        s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) return console.error(err)
          resolve(url);
        })
      });
    }

    async function process(items) {
      for (let item of items) {
        const signedUrl = await getSignedUrl(item.Key);
        var gameType = item.Key.split('-')[0];
        if (urls[gameType] === undefined) {
          urls[gameType] = [];
        }
        urls[gameType].push(signedUrl);
      }
      return urls;
    }


    process(bucketContents).then(res => {
      cb(res);
    });
  });
}

// // Helper function for client
// const getLogoURLs = async (arr, cb) => {
//   let newArr = [];

//   async function getSignedUrl(key) {
//     return new Promise((resolve, reject) => {
//       let params = { Bucket: 'hrr38-fecteam3-oslogos', Key: key, Expires: 604800 }; // max expiration allowed 7 days
//       s3.getSignedUrl('getObject', params, (err, url) => {
//         if (err) return console.error(err)
//         resolve(url);
//       })
//     });
//   }

//   async function process(arr) {
//     for (let item of arr) {
//       const signedUrl = await getSignedUrl(item+'-logo.png');
//       newArr.push(signedUrl);
//     }
//     return newArr;
//   }

//   // return await Promise.all(arr.map(item => asyncFunc(item)));
//   process(arr).then(res => {
//     cb(res)
//   })
// };

module.exports = { getImageURLs};

// https://hrr38-fecteam3-oslogos              .s3.us-west-1.amazonaws.com/windows-logo.png?   AWSAccessKeyId=AKIARIHXW3MLENSB27G7&Expires=1559514237&Signature=OEp94LBtS+amCLMjuF7oFEmItzQ=
// https://hrr38-fecteam3-purchaseoptionsimages.s3.us-west-1.amazonaws.com/car-sand.jpg    ?   AWSAccessKeyId=AKIARIHXW3MLENSB27G7&Expires=1559514237&Signature=kZRkLW4ISOslXyLNYtlR9nPMnnw=
// https://hrr38-fecteam3-purchaseoptionsimages.s3.us-west-1.amazonaws.com/car-blurredsign.jpg?AWSAccessKeyId=AKIARIHXW3MLENSB27G7&Expires=1559514237&Signature=eb1X6R6qXtV%2BYI5uQOoRwLMRETY%3D