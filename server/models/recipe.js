export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
    Recipe.hasMany(models.Upvote, {
      foreignKey: 'recipeId',
      as: 'Upvotes',
    });
    Recipe.hasMany(models.Downvote, {
      foreignKey: 'recipeId',
      as: 'Downvotes',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });
  };

  return Recipe;
};