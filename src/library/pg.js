const { Pool } = require("pg");
const config = require("../config/index.js");

const pool = new Pool({
  host: config.postgresHost,
  database: config.postgresDatabase,
  password: config.postgresPassword,
  port: config.postgresPort,
  user: config.postgresUser,
});

class Postgress {
  async fetch(SQL, ...args) {
    const client = await pool.connect();
    try {
      const {
        rows: [row],
      } = await client.query(SQL, args);
      return row;
    } finally {
      client.release();
    }
  }

  async fetchAll(SQL, ...args) {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(SQL, args);
      return rows;
    } finally {
      client.release();
    }
  }
}

module.exports = { Postgress };
