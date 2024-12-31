const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

// Create a MySQL connection pool using mysql2
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  queueLimit: 0,
});

// Initialize Drizzle ORM with the MySQL connection pool
const db = drizzle(pool);

const sql = db.sql;

async function dbConnection() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = {
  pool,
  db,
  sql,
  dbConnection
};
