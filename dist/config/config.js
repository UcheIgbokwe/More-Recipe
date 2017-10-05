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
    username: 'postgres',
    password: 'Ebubechi',
    database: 'MoreRecipe',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};