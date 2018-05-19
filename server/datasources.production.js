'use strict';

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    connector: 'mysql',
  },
  twilio: {
    name: 'twilio',
    connector: 'loopback-connector-twilio',
    accountSid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_SECRET,
  },
};
