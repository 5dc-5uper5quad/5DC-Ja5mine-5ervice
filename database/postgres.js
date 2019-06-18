const Promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: Promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

// Database connection details;
const connection = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'steam',
    user: 'jaz',
    password: 'pass123'
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js

const db = pgp(connection); // database instance;

module.exports = db;