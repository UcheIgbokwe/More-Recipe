'use strict';

var dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'Ebubechi',
    database: 'MoreRecipe',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};