'use strict';

var fs = require('fs');
var path = require('path');
// process.env.NODE_ENV = 'production';
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var basename = path.basename(module.filename);
var config = require('../config/config')[env] || 'development';

var db = {};

var sequelize = void 0;
// console.log(config, env)
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize;
db.Sequelize;

module.exports = db;