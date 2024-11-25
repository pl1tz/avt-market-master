import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilterSlice } from '../../interfaces/slice.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FetchFiltersParams, FilterKeys, FilterResponse } from '../../interfaces/filter.interface';

export const DEFAULT_FILTER_VALUES: Record<FilterKeys, string> = {
    brand_name: 'Все марки',
    model_name: 'Все модели',
    generation_name: 'Поколение',
    year_from: 'Год от',
    max_price: 'Цена до',
    engine_name_type_name: 'Двигатель',
    gearbox_type_name: 'КПП',
    body_type_name: 'Тип кузова',
    drive_type_name: 'Привод',
    owners_count: 'Владельцев',
} as const;

export const filterMapping = {
    brand_name: 'brand_name',
    model_name: 'model_name',
    generation_name: 'generation_name',
    year_from: 'year_from',
    max_price: 'max_price',
    engine_name_type_name: 'engine_name_type_name',
    gearbox_type_name: 'gearbox_type_name',
    body_type_name: 'body_type_name',
    drive_type_name: 'drive_type_name',
    owners_count: 'owners_count',
} as const;

export const loadFilters = createAsyncThunk(
    'filters/loadFilters',
    async (params: FetchFiltersParams, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value && key in filterMapping) {
                    queryParams.append(filterMapping[key as keyof typeof filterMapping], value);
                }
            });

            const url = `${process.env.REACT_APP_BASE_URL!}/filters?${queryParams.toString()}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Ошибка загрузки фильтров');
        }
    },
);

const initialState: FilterSlice = {
    values: {
        brand_name: null,
        model_name: null,
        generation_name: null,
        year_from: null,
        max_price: null,
        engine_name_type_name: null,
        gearbox_type_name: null,
        body_type_name: null,
        drive_type_name: null,
        owners_count: null,
    } as Record<FilterKeys, string | null>,
    state: {
        isLoading: false,
        filtersList: [],
        error: null,
        carCount: null,
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterValue: (state, action: PayloadAction<{ key: FilterKeys; value: string | null }>) => {
            state.values[action.payload.key as FilterKeys] = action.payload.value;

            if (action.payload.key === 'brand_name') {
                state.values.model_name = null;
                state.values.generation_name = null;
            } else if (action.payload.key === 'model_name') {
                state.values.generation_name = null;
            }
        },
        resetFilters: (state) => {
            state.values = {
                brand_name: null,
                model_name: null,
                generation_name: null,
                year_from: null,
                max_price: null,
                engine_name_type_name: null,
                gearbox_type_name: null,
                body_type_name: null,
                drive_type_name: null,
                owners_count: null,
            } as Record<FilterKeys, string | null>;

            state.state = {
                isLoading: false,
                filtersList: [],
                error: null,
                carCount: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                state.state.isLoading = false;

                const carCountItem = action.payload.find((item: FilterResponse) => item.key === 'car_count');
                const filters = action.payload.filter((item: FilterResponse) => item.key !== 'car_count');

                state.state.filtersList = filters;
                state.state.carCount = carCountItem ? Number(carCountItem.value) : null;
            })
            .addCase(loadFilters.pending, (state) => {
                state.state.isLoading = true;
                state.state.error = null;
            })
            .addCase(loadFilters.rejected, (state, action) => {
                state.state.isLoading = false;
                state.state.error = action.payload as string;
            });
    },
});

export const { setFilterValue, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
