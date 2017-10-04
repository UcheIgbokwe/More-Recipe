module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    User.hasMany(models.Vote, {
      foreignKey: 'userId',
      as: 'votes',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites',
    });
  };

  return User;
};