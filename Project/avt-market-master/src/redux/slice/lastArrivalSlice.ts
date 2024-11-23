import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AutoCard } from '../../interfaces/cars.interface';
import type { LastArrivalsSlice } from '../../interfaces/slice.interface';

const initialState: LastArrivalsSlice = {
    lastArrivalsList: [],
    stateLoad: {
        isLoad: false,
        error: false,
    },
};

const lastArrivalsLoader = createAsyncThunk('lastArrivals/fetchLastArrivals', async (): Promise<AutoCard[]> => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/last_cars`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
});

const inStockSlice = createSlice({
    name: 'last-arrivals',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(lastArrivalsLoader.fulfilled, (state, action) => {
                state.stateLoad.isLoad = false;
                state.stateLoad.error = false;
                state.lastArrivalsList = action.payload;
            })
            .addCase(lastArrivalsLoader.pending, (state) => {
                state.stateLoad.error = false;
                state.stateLoad.isLoad = true;
            })
            .addCase(lastArrivalsLoader.rejected, (state) => {
                state.stateLoad.error = true;
                state.stateLoad.isLoad = false;
            });
    },
});

export { lastArrivalsLoader };
export default inStockSlice.reducer;
