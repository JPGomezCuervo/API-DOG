import {configureStore} from '@reduxjs/toolkit';
import dogsReducer from '../features/dogsSlice';
import temperamentsReducer from '../features/temperamentsSlice';
import utilsReducer from '../features/utilsSlice';
import { cacheMiddleware } from '../features/dogsSlice';
const store = configureStore({
    reducer: {
        dogs: dogsReducer,
        temperaments: temperamentsReducer,
        utils: utilsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheMiddleware),
    devTools: process.env.NODE_ENV !== 'production'

});

export default store;