'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      lowercase: true,
      trim: true,
      required: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      lowercase: true,
      trim: true,
      required: true,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      lowercase: true,
      trim: true,
      required: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
      required: true,
      allowNull: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Recipes, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Reviews, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorites, {
      foreignKey: 'userId'
    });
  };
  return User;
};