const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_life_span: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_life_span: {
      type: DataTypes.STRING,
      allowNull: false
    },   
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  },);
  
  return Dog;
};
