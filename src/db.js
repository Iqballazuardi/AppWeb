const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "appweb",
  password: "1",
  port: 5173,
});

module.exports = pool;
