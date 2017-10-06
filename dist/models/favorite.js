'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Favorites.associate = function (models) {
    Favorites.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Favorites.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Favorites;
};