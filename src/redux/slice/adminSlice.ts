import { createSlice } from '@reduxjs/toolkit';

const initialState: { isAuth: boolean } = {
    isAuth: false,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setAuth } = adminSlice.actions;
export default adminSlice.reducer;
