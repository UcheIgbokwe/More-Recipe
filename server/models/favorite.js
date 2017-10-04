module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    
  };

  return Favorite;
};