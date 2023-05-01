const axios = require('axios');

const getTemperaments = async () => {
  try {
    const { data } = await axios.get('https://api.thedogapi.com/v1/breeds');
    const mapper = data.map((elemento) => elemento.temperament);
    const newArray = mapper.map((elemento) => elemento ? elemento.split(',').map((e) => e.trim()) : null );
    const filteredArray = newArray.filter((elemento) => elemento !== null);
    const flatArray = filteredArray.flat();
    const sortedSet = new Set([...flatArray].sort());
    const temperaments = [...sortedSet];
    return temperaments;
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = getTemperaments;
