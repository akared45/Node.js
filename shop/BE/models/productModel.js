const db = require('../config/db');

module.exports = {
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE Id = ?', [id], callback);
  },

  create: (product, callback) => {
    const { Title, Price, IDate, Quantity } = product;
    db.query('INSERT INTO products (Title, Price, IDate, Quantity) VALUES (?, ?, ?, ?)',
      [Title, Price, IDate, Quantity], callback);
  },

  update: (id, product, callback) => {
    const { Title, Price, IDate, Quantity } = product;
    db.query('UPDATE products SET Title = ?, Price = ?, IDate = ?, Quantity = ? WHERE Id = ?',
      [Title, Price, IDate, Quantity, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM products WHERE Id = ?', [id], callback);
  }
};
