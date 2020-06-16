const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const pool = new Pool(dbParams);

module.exports = {
   query: (text, params) => {
    return pool.query(text, params)
  }
}

