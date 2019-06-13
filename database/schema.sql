DROP DATABASE steam;
CREATE DATABASE steam;

CREATE TABLE games (
  game_name      TEXT,
  game_type      TEXT,
  original_price NUMERIC,
  reviews        TEXT,
  os             TEXT
);

CREATE TABLE dlc (
  dlc_name         TEXT,
  price            NUMERIC,
  release_date     TEXT,
  user_reviews_num INT,
  user_tags        TEXT,
  images           TEXT
);


/*  Execute this file from the psql shell command line by typing:
 * run \i /Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/database/schema.sql
 *  to create the database and the tables.*/
