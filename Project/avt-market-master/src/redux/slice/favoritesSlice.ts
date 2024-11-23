import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setValueToLocalStorage } from '../../helpers/localStorage/setValueToLocalStorage';
import { getValueFromLocalStorage } from '../../helpers/localStorage/getValueFromLocalStorage';
import type { FavoritesSlice } from '../../interfaces/slice.interface';
import type { AutoCard } from '../../interfaces/cars.interface';

const favoritesList = getValueFromLocalStorage<AutoCard[]>('favorites', []);

const initialState: FavoritesSlice = {
    favoritesList,
    favoritesCount: favoritesList.length,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<AutoCard>) => {
            state.favoritesList.push(action.payload);
            state.favoritesCount = state.favoritesList.length;
            setValueToLocalStorage<AutoCard[]>('favorites', state.favoritesList);
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.favoritesList = state.favoritesList.filter((car) => car.id !== action.payload);
            state.favoritesCount = state.favoritesList.length;
            setValueToLocalStorage<AutoCard[]>('favorites', state.favoritesList);
        },
    },
});

export const { removeFromFavorites, addToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
