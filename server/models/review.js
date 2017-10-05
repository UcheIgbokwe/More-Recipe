export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
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
