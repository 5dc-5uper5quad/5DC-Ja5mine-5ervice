DROP DATABASE steam;
CREATE DATABASE steam;
/* To connect to the games database */
\c games;

CREATE games ({
  game_id INTEGER PRIMARY KEY,
  game_name text,
  game_type: text,
  original_price: text,
  sale_boolean: boolean,
  sale_percentage: text,
  franchise: boolean,
  sale_countdown_boolean: boolean,
  os: [text]
})

CREATE dlc ({
  dlc_name: text,
  price: text,
  release_date: Date,
  user_reviews_overall: text,
  user_reviews_num: numeric,
  user_tags: [text],
  images: [text]
})











/*  Execute this file from the command line by typing:
 *   psql -U username -d myDataBase -a -f /database/schema.sql
 *  to create the database and the tables.*/
