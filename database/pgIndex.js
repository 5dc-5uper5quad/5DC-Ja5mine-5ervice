const { Pool } = require('pg');

const pool = new Pool({
  user: 'jas',
  host: 'localhost',
  database: 'steam',
  password: 'password',
  port: 5432,
})

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const connection = "postgres://@localhost:5432/games"

module.exports.pgdb = pool;
