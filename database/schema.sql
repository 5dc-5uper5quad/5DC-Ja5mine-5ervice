DROP DATABASE steam;
CREATE DATABASE steam;

CREATE TABLE games (
  game_id INTEGER PRIMARY KEY,
  game_name text,
  game_type text,
  original_price numeric,
  reviews text
);

CREATE TABLE dlc (
  dlc_name text,
  price numeric,
  user_reviews_overall text,
  user_reviews_num int,
  user_tags text,
  images text,
  game_id INTEGER NOT NULL REFERENCES games(game_id)
);

/* 
 * When first using postgrSQL, you must create a new database cluster in the terminal
 * 'initdb [option...] [--pgdata | -D] directory' i.e initdb -D SDC 
 * You can now start the database server using:
 * pg_ctl -- initialize, start, stop, or control a PostgreSQL server
 * pg_ctl -D SDC -l logfile start
 */


/*  Execute this file from the command line by typing:
 * run \i /Users/Jasmine/hrr38/SDC/5DC-Ja5mine-5ervice/database/schema.sql
 *  to create the database and the tables.*/
