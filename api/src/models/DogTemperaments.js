const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DogTemperaments = sequelize.define('dog_temperaments', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        dogId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'dogs',
                key: 'id'
            }
        },
        temperamentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'temperaments',
                key: 'id'
            }
        }
    });
    return DogTemperaments;
}