const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.query('CREATE DATABASE IF NOT EXISTS shop', (err) => {
  if (err) throw err;
  console.log('Create database success');
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shop'
});

db.connect((err) => {
  if (err) throw err;
 console.log('MySQL connection successful');

  db.query(`
    CREATE TABLE IF NOT EXISTS products (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Title VARCHAR(255) NOT NULL,
      Price DECIMAL(10, 2) NOT NULL,
      IDate DATE NOT NULL,
      Quantity INT NOT NULL
    )
  `, (err) => {
    if (err) throw err;
    console.log('Create table success');
  });
});

module.exports = db;
