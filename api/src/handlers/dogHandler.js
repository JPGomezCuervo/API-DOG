const { createDogDB, 
        getAllDogs,
        getAPIByID,
        getDBByID,
        getAPIByBreed,
        getDBByBreed,
        validateDog,
    } = require('../controllers/dogController');
const { individualCleanerDB, allDogsCleanerDB } = require('../utils');


const postDogHandler = async (req, res) => {
    try {
        const breedLowerCase = req.body.breed.toLowerCase();
        const cleanBody = req.body;
        
        cleanBody.breed = breedLowerCase;

        const findDog = await validateDog(breedLowerCase);
        
        if (!findDog) {            
            const response = await createDogDB(cleanBody)
            res.status(200).json(response);
        } else {
            throw new Error('You cannot create a dog that already exists in the database');
        }

    } catch (error) {
        res.status(400).json({error: error.message});

    }

};

const getDogHandler = async (req, res) => {
    const {breed} = req.query;
    const toLowerCase = breed && breed.toLowerCase();
    if (breed) {
        const responseAPI = await getAPIByBreed(toLowerCase);
        const responseDB = await getDBByBreed(toLowerCase);
        const cleanedResponseDB = allDogsCleanerDB(responseDB);
        const response = responseAPI.concat(cleanedResponseDB.reverse());
        return response && response.length > 0 ? res.status(200).json(response)
        : res.status(404).json({error: 'No results found'});
    }
    await getAllDogs().
    then(response => res.status(200).json(response))
    
};

const getDogByID = async (req, res) => {
    const {idBreed} = req.params;
    const finderAPI = !isNaN(idBreed) ? 'API' : 'DB';

    if (finderAPI === 'API') {
        getAPIByID(idBreed)
        .then(response => res.status(200).json(response)).
        catch(error => res.status(500).json({error: error.message}));

    }
    if (finderAPI === 'DB') {
        try {
            const response = await getDBByID(idBreed);
            const responseCleaned = individualCleanerDB(response);
            return res.status(200).json(responseCleaned);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
};

module.exports = {
    postDogHandler,
    getDogHandler,
    getDogByID

}