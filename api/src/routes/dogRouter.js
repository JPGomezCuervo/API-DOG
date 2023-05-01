const {Router} = require('express');
const {postDogHandler, getDogHandler, getDogByID} = require('../handlers/dogHandler');
const dogRouter = Router();

dogRouter.post('/', postDogHandler);
dogRouter.get('/', getDogHandler);
dogRouter.get('/:idBreed', getDogByID);

module.exports = dogRouter;