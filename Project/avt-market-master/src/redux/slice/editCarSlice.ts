import { createSlice } from '@reduxjs/toolkit';
import type { AutoCard } from '../../interfaces/cars.interface';

const initialState: { car: AutoCard | null } = {
    car: null,
};

const editCarSlice = createSlice({
    name: 'editCar',
    initialState,
    reducers: {
        setEditCar: (state, action) => {
            state.car = action.payload;
        },
    },
});

export const { setEditCar } = editCarSlice.actions;
export default editCarSlice.reducer;
