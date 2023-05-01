const {Temperament} = require('../db.js');

const getAllTemperamentsDB = async () => {
    return await Temperament.findAll();
};

const findOrcreateTemperamentDB = async (temperaments) => {
    const createdTemperaments = [];
    for (const temperament of temperaments) {
      const [createdTemperament, created] = await Temperament.findOrCreate({
        where: {
          name: temperament.name
        }
      });
      if (created) {
        createdTemperaments.push(createdTemperament);
      }
      if (!created) {
        createdTemperaments.push({error: `The temperament ${temperament.name} already exists`});
      }
    }
    return createdTemperaments;
  };
  


module.exports = {
    getAllTemperamentsDB,
    findOrcreateTemperamentDB
};