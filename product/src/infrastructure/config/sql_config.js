require('dotenv').config();

['SQL_HOST', 'SQL_USER', 'SQL_PASSWORD', 'SQL_DATABASE'].forEach((key) => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});


module.exports = {
    sql: {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
    }
};
