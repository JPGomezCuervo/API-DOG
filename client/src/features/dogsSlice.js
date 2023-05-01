import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    sortAtoZ,
    sortZtoA,
    sortLightier,
    sortHeavier,
    objectByLetters,
    objectByNumbers,
    secondFilter,
    flatten,
    reverse
 } from "../utils/sorterUtils";
import axios from "axios";

const fetchDogs = createAsyncThunk(
    'dogs/fetchDogs', async () => {
    const response = await axios.get('http://localhost:3001/dogs');
    return response.data;
    }
);
 const fetchDogsByName = createAsyncThunk(
    'dogs/fetchDogsByName', async (name) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?breed=${name}`);
            return response.data;

        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);
const fetchDogById = createAsyncThunk(
    'dogs/fetchDogById', async (id) => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        return response.data;
    }
);
export const cacheMiddleware = (store) => (next) => (action) => {
    if (action.type === 'dogs/fetchDogs/fulfilled' && store.getState().dogs.dogs.length > 0) {
        return Promise.resolve()
};
    return next(action);
};


const initialState = {
    dogs: [],
    dog: {},
    filters: {
        weight: {
            lighter: false,
            heavier: false
        },
        temperament: false,
        breed: {
            aToZ: false,
            zToA: false
        } ,
        dbprocedence: false
    },
    status: 'idle',
    error: null
};

const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        sortLightestStore: (state) => {
            state.dogs = sortLightier(state.dogs);
        },

        sortHeaviestStore: (state) => {
            state.dogs = sortHeavier(state.dogs);
        },

        sortFromAToZStore: (state) => {
            state.dogs = sortAtoZ(state.dogs);
        },

        sortFromZToAStore: (state) => {
            state.dogs = sortZtoA(state.dogs);
        },
        //Sorteos donde el filtro principal es alfabético
        sortHeaviestAtoZ: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByLetters(sortAtoZ(state.dogs)),sortHeavier)));
        },
        sortLightestAtoZ: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByLetters(sortAtoZ(state.dogs)),sortLightier)));
        },
        sortHeaviestZtoA: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByLetters(sortZtoA(state.dogs)),sortHeavier)));
        },
        sortLightestZtoA: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByLetters(sortZtoA(state.dogs)),sortLightier)));
        },
        //Sorteos donde el filtro principal es numérico
        sortAtoZHeaviest: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByNumbers(sortHeavier(state.dogs)),sortAtoZ)));
        },
        sortAtoZLightest: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByNumbers(sortLightier(state.dogs)),sortAtoZ)));
        },
        sortZtoAHeaviest: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByNumbers(sortHeavier(state.dogs)),sortZtoA)));
        },
        sortZtoALightest: (state) => {
            state.dogs = flatten(reverse(secondFilter(objectByNumbers(sortLightier(state.dogs)),sortZtoA)));
        },
        

            sortByTemperament: (state, { payload }) => {
                const dogs = state.dogs;
                const temperamentArray = payload;
                const filteredDogs = dogs.filter((dog) => {
                if (dog.temperament) {
                    const temperaments = dog.temperament.split(", ");
                    return temperamentArray.every((temp) => temperaments.includes(temp));
                }
                return false;
                });
                state.dogs = filteredDogs;
                if (filteredDogs.length === 0) state.error = `No found dogs with temperaments: ${temperamentArray.join(", ")}...`;
                if (filteredDogs.length > 0) state.error = '';
            },

        sortByDbprocedence: (state) => {
            const dogs = state.dogs;
            const filteredDogs = dogs.filter((dog) =>  isNaN(dog.id));
            state.dogs = filteredDogs;
        },
        clearDogs: (state) => {
            state.dogs = [];
        },

        clearDog: (state) => {
            state.dog = {};
        },

        activeFilters: (state, { payload }) => {
            state.filters[payload.name] = payload.value;
        },

        disableAllFilters: (state) => {
        state.filters.breed = {aToZ: false, zToA: false};
        state.filters.weight = {heavier: false, lighter: false};
        state.filters.temperament = false;
        }
          
          
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.dogs = action.payload.sort(() => Math.random() - 0.5);
                state.status = 'succeeded';
                state.error = '';
            })
            .addCase(fetchDogs.pending, (state, action) => {
                if(state.dogs.length > 0) {
                    state.status = 'succeeded';
                } else {

                    state.status = 'loading';
                }
            })
            .addCase(fetchDogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchDogsByName.fulfilled, (state, action) => {
                state.dogs = action.payload;
                state.status = 'succeeded';
                state.error = '';
            })
            .addCase(fetchDogsByName.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchDogsByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.dogs = [];
            })
            .addCase(fetchDogById.fulfilled, (state, action) => {
                state.dog = action.payload;
                state.status = 'succeeded';
                state.error = '';
            })
            .addCase(fetchDogById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchDogById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.dogs = [];
            });
    }
});

export const selectAllDogs = (state) => state.dogs.dogs;
export const selectDogsStatus = (state) => state.dogs.status;
export const selectDogsError = (state) => state.dogs.error;
export const selectIndividualDog = (state) => state.dogs.dog;
export const selectFilters = (state) => state.dogs.filters;

export default dogsSlice.reducer;
export const { sortHeaviestStore, sortLightestStore, sortFromAToZStore, sortFromZToAStore, sortByTemperament, clearDog, sortByDbprocedence, activeFilters, disableAllFilters,sortHeaviestAtoZ, sortHeaviestZtoA, sortLightestAtoZ, sortLightestZtoA, sortAtoZHeaviest, sortAtoZLightest, sortZtoAHeaviest, sortZtoALightest, clearDogs } = dogsSlice.actions;
export { fetchDogs, fetchDogsByName, fetchDogById };