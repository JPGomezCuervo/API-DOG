const {Router} = require('express');
const temperamentRouter = Router();
const {getTemperamentHandler, postTemperamentHandler} = require('../handlers/temperamentHandler');

temperamentRouter.get('/', getTemperamentHandler );
temperamentRouter.post('/', postTemperamentHandler);

module.exports = temperamentRouter;