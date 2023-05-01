import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    selectedTemperaments: [],
    searchbar: '',
};

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setNextPage: (state) => {
            state.currentPage = state.currentPage + 1
        },

        setPrevPage: (state) => {
            state.currentPage = state.currentPage - 1
        },
        setSelectedTemperaments: (state, action) => {
            state.selectedTemperaments = action.payload;
        },
        setSearchbar: (state, action) => {
            state.searchbar = action.payload;
        },
    }
});

export const selectedTemperamentsStore = state => state.utils.selectedTemperaments;
export const selectCurrentPage = state => state.utils.currentPage;
export const selectSearchbar = state => state.utils.searchbar;

export const { setCurrentPage, setSelectedTemperaments, setSearchbar, setNextPage, setPrevPage} = utilsSlice.actions;
export default utilsSlice.reducer;
