const mysql = require('mysql2/promise');
const config = require('../config/config');

function initializeDatabase() {
  return mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
  }).then(connection => {
    return connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.mysql.database}\``)
      .then(() => connection.query(`USE \`${config.mysql.database}\``))
      .then(() => connection.query(`
        CREATE TABLE IF NOT EXISTS cars (
          id INT AUTO_INCREMENT PRIMARY KEY,
          brand VARCHAR(255) NOT NULL,
          model VARCHAR(255) NOT NULL,
          year INT NOT NULL,
          price DECIMAL(10,2) NOT NULL
        )
      `))
      .then(() => connection);
  }).catch(error => {
    console.error('Database initialization failed:', error.message);
    throw error;
  });
}

module.exports = { initializeDatabase };
