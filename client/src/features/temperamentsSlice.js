import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    temperaments: [],
    status: 'idle',
    error: null
};

const fetchTemperaments = createAsyncThunk(
    'temperaments/fetchTemperaments', async () => {
    const response = await axios.get('http://localhost:3001/temperaments');
    return response.data;
    }
);

const temperamentsSlice = createSlice({
    name: 'temperaments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTemperaments.fulfilled, (state, action) => {
                state.temperaments = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTemperaments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTemperaments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectAllTemperaments = (state) => state.temperaments.temperaments;    
export const selectTemperamentsStatus = (state) => state.temperaments.status;
export const selectTemperamentsError = (state) => state.temperaments.error;
export default temperamentsSlice.reducer;
export { fetchTemperaments };