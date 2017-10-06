'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    recipeName: {
      type: DataTypes.STRING,
      trim: true
    },
    ingredientQuantity: {
      type: DataTypes.STRING
    },
    ingredient: {
      type: DataTypes.STRING
    },
    recipeDirection: {
      type: DataTypes.TEXT
    },
    recipeImage: {
      type: DataTypes.TEXT
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });

    Recipe.hasMany(models.Favorites, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });
  };
  return Recipe;
};