const {Dog, Temperament } = require('../db');
const axios = require('axios');
const {allDogsCleanerAPI, detailCleanerAPI, allDogsCleanerDB} = require('../utils/index');
const { Op } = require('sequelize');


const createDogDB = async ({breed, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, url, temperaments}) => {
    try {
        const dog = await Dog.create({breed, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image: url});
        const temperamentIds = temperaments.map(temp => temp.id);
        await dog.addTemperaments(temperamentIds);
        return {message: 'Dog created successfully', dog: dog}
    } catch (error) {
        throw new Error(error);
    }
  };
  

const getAllDogs = async () => {
    const getDB = await Dog.findAll(
        {
            include: [
                {
                    model: Temperament,
                    as: 'temperaments',
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ],
        }
    );
    const unifiedTemperaments = getDB.map(dog => {
        const temperaments = dog.temperaments.map(temp => {
            return temp.name
        })
        return {
            id: dog.id,
            name: dog.breed,
            min_height: dog.min_height,
            max_height: dog.max_height,
            min_weight: dog.min_weight,
            max_weight: dog.max_weight,
            min_life_span: dog.min_life_span,
            max_life_span: dog.max_life_span,
            image: dog.image,
            temperaments: temperaments.join(', ')
        }
    });
    const getDBclean = await allDogsCleanerDB(unifiedTemperaments).reverse();
    const getAPI = (await axios.get('https://api.thedogapi.com/v1/breeds'));
    const getAPIclean = await allDogsCleanerAPI(getAPI.data);
    const allDogs = getDBclean.concat(getAPIclean);
    return allDogs;
};

const getAPIByID = async (breed) => {
    const getAPI = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    const filter = getAPI.find(dog => dog.id === parseInt(breed));
    const cleanedAPIData = detailCleanerAPI(filter);

    return cleanedAPIData;
};

const getDBByID = async (idBreed) => {
    const getDB = await Dog.findAll({
        where: {
            id: idBreed
        },
        include: [
            {
                model: Temperament,
                as: 'temperaments',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        ]
    });
    const unifiedTemperaments = getDB.map(dog => {
        const temperaments = dog.temperaments.map(temp => {
            return temp.name
        })
        return {
            id: dog.id,
            name: dog.breed,
            min_height: dog.min_height,
            max_height: dog.max_height,
            min_weight: dog.min_weight,
            max_weight: dog.max_weight,
            min_life_span: dog.min_life_span,
            max_life_span: dog.max_life_span,
            image: dog.image,
            temperaments: temperaments.join(', ')
        }
    });
    return unifiedTemperaments[0];
};

const getAPIByBreed = async (name) => {
    const responseApi = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    const filter = responseApi.filter((dog) => dog.name.toLowerCase().includes(name));
    const cleanedAPIData = allDogsCleanerAPI(filter);
    return cleanedAPIData;

};
const getDBByBreed = async (breed) => {
    const filter = await Dog.findAll({
        where: {
            breed: {
                [Op.iLike]: `%${breed}%`
            }
        },
        include: [
            {
                model: Temperament,
                as: 'temperaments',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        ]
    });
    const unifiedTemperaments = filter.map(dog => {
        const temperaments = dog.temperaments.map(temp => {
            return temp.name
        })
        return {
            id: dog.id,
            name: dog.breed,
            min_height: dog.min_height,
            max_height: dog.max_height,
            min_weight: dog.min_weight,
            max_weight: dog.max_weight,
            min_life_span: dog.min_life_span,
            max_life_span: dog.max_life_span,
            image: dog.image,
            temperaments: temperaments.join(', ')
        }
    });
    return unifiedTemperaments;
};

const validateDog = async (breed) => {
    const findAPIDog = async () => {
        const API = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
        const mapNames = API.map(dog => dog.name.toLowerCase());
        return mapNames.includes(breed.toLowerCase());
      };
    const findDBDog = async () => {
        const DB = await Dog.findAll();
        const mapNames = DB.map(dog => dog.breed.toLowerCase());
        return mapNames.includes(breed.toLowerCase());
    }
    const findDog = await findAPIDog() || await findDBDog();
    return findDog;
};

module.exports = {
    createDogDB,
    getAllDogs,
    getAPIByID,
    getDBByID,
    getAPIByBreed,
    getDBByBreed,
    validateDog
};