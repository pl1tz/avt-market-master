import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { InStockSlice } from '../../interfaces/slice.interface';
import type { CarsCount } from '../../interfaces/cars.interface';

const initialState: InStockSlice = {
    inStockList: [],
    stateLoad: {
        isLoad: false,
        error: false,
    },
};

const inStockListLoader = createAsyncThunk('inStockList/fetchInStockList', async (): Promise<CarsCount[]> => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/cars_count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
});

const inStockSlice = createSlice({
    name: 'in-stock',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(inStockListLoader.fulfilled, (state, action) => {
                state.stateLoad.isLoad = false;
                state.stateLoad.error = false;
                state.inStockList = action.payload;
            })
            .addCase(inStockListLoader.pending, (state) => {
                state.stateLoad.error = false;
                state.stateLoad.isLoad = true;
            })
            .addCase(inStockListLoader.rejected, (state) => {
                state.stateLoad.error = true;
                state.stateLoad.isLoad = false;
            });
    },
});

export { inStockListLoader };
export default inStockSlice.reducer;
