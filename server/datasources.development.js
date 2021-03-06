'use strict';

module.exports = {
  db: {
    host: 'localhost',
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connector: process.env.DB_CONNECTOR,
  },
};
