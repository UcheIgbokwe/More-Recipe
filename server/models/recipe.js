module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {    
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.belongsTo(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
    Recipe.belongsTo(models.Vote, {
      foreignKey: 'recipeId',
      as: 'votes',
    });
    Recipe.belongsTo(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });
  };

  return Recipe;
};