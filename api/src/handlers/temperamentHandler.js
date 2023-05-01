const {findOrcreateTemperamentDB, getAllTemperamentsDB} = require('../controllers/temperamentController');

const postTemperamentHandler = async (req, res) => {
    const {temperaments} = req.body;
    try {
        const response = await findOrcreateTemperamentDB(temperaments);
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
    
}
const getTemperamentHandler = async (req, res) => {
    try {
        const response = await getAllTemperamentsDB();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};
module.exports = {
    getTemperamentHandler,
    postTemperamentHandler
};