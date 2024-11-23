import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SORT_OPTIONS = {
    price_asc: { param: 'price_asc', label: 'Сначала дешевле' },
    price_desc: { param: 'price_desc', label: 'Сначала дороже' },
    mileage_asc: { param: 'mileage', label: 'Минимальный пробег' },
    created_at_desc: { param: 'newest', label: 'Сначала новые' },
} as const;

export type SortOptionKey = keyof typeof SORT_OPTIONS;
export type ViewMode = 'vertical' | 'horizontal';

interface SortCarsState {
    sortBy: SortOptionKey | undefined;
    viewMode: ViewMode;
}

const initialState: SortCarsState = {
    sortBy: undefined,
    viewMode: 'vertical',
};

const sortCarsSlice = createSlice({
    name: 'sortCars',
    initialState,
    reducers: {
        setSortOption: (state, action: PayloadAction<SortOptionKey>) => {
            state.sortBy = action.payload;
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'vertical' ? 'horizontal' : 'vertical';
        },
        setViewMode: (state, action: PayloadAction<ViewMode>) => {
            state.viewMode = action.payload;
        },
    },
});

export const { setSortOption, toggleViewMode, setViewMode } = sortCarsSlice.actions;

export const selectSortOption = (state: { sortCars: SortCarsState }) => state.sortCars.sortBy;
export const selectViewMode = (state: { sortCars: SortCarsState }) => state.sortCars.viewMode;

export default sortCarsSlice.reducer;
