const { DataTypes } = require('sequelize');
const getTemperaments = require('../utils/getTemperaments.js');

module.exports = (sequelize) => {
  const Temperament = sequelize.define('temperament', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });

  (async () => {
    const temperaments = await getTemperaments();
    
    temperaments.forEach(async (temperament) => {
      await Temperament.findOrCreate({
        where: {
          name: temperament
        }
      });
    });
  })();

  return Temperament;
};
