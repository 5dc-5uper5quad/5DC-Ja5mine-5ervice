const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/purchaseoptionsservice', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let dlcSchema = mongoose.Schema({
  dlc_name: String,
  price: String,
  release_date: Date,
  user_reviews_overall: String,
  user_reviews_num: Number,
  user_tags: [String],
  images: [String]
});

let gamesSchema = mongoose.Schema({
  game_id: { type: Number, unique: true },
  game_name: String,
  game_type: String,
  original_price: String,
  sale_boolean: Boolean,
  sale_percentage: String,
  dlcs: [dlcSchema],
  franchise: Boolean,
  sale_countdown_boolean: Boolean,
  os: [String]
});


let DLC = mongoose.model('DLC', dlcSchema);
let Games = mongoose.model('Games', gamesSchema);

module.exports = { Games, db: mongoose.connection };