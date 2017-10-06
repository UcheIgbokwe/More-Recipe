'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    recipeId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.TEXT
    }
  });
  return Reviews;
};