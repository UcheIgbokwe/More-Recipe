'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING,
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
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Review.belongsTo(models.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
  };
  return Review;
};