import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../helpers/customFetch';
import type { AboutSlice } from '../../interfaces/slice.interface';

const initialState: AboutSlice = {
    about: [],
    stateLoad: {
        isLoading: false,
        error: false,
    },
};

export const loadAbout = createAsyncThunk('about/loadAbout', async () => {
    const response = await customFetch({ url: 'about_companies', method: 'GET' });
    return response;
});

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAbout.fulfilled, (state, action) => {
                state.about = action.payload as { id: number; description: string }[];
                state.stateLoad.isLoading = false;
                state.stateLoad.error = false;
            })
            .addCase(loadAbout.pending, (state) => {
                state.stateLoad.isLoading = true;
                state.stateLoad.error = false;
            })
            .addCase(loadAbout.rejected, (state) => {
                state.stateLoad.error = true;
                state.stateLoad.isLoading = false;
            });
    },
});

export default aboutSlice.reducer;
