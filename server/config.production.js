'use strict';

module.exports = {
  'restApiRoot': '/api',
  'host': '0.0.0.0',
  'port': process.env.API_PORT,
  'remoting': {
    'context': false,
    'rest': {
      'handleErrors': false,
      'normalizeHttpPath': false,
      'xml': false,
    },
    'json': {
      'strict': false,
      'limit': '100kb',
    },
    'urlencoded': {
      'extended': true,
      'limit': '100kb',
    },
    'cors': true,
  },
  'googleAppKey': process.env.GOOGLE_API_KEY,
};
