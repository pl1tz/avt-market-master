import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterMapping } from './filterSlice';
import { AutoCard } from '../../interfaces/cars.interface';
import type { RootState } from '../store';

interface CarsState {
    carsList: AutoCard[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        currentPage: number;
        totalPages: number;
    };
}

interface LoadCarsParams {
    page?: number;
    [key: string]: string | number | undefined;
}

export const loadCars = createAsyncThunk('cars/loadCars', async (params: LoadCarsParams | undefined, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const filterValues = state.filter.values;
        const queryParams = new URLSearchParams();

        const page = params?.page || 1;
        queryParams.append('page', String(page));

        const allParams: Record<string, string> = {};

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value && key !== 'page') {
                    allParams[key] = String(value);
                }
            });
        }

        Object.entries(filterValues).forEach(([key, value]) => {
            if (value && key in filterMapping) {
                const apiKey = filterMapping[key as keyof typeof filterMapping];
                if (!(apiKey in allParams)) {
                    allParams[apiKey] = value;
                }
            }
        });

        const queryString = Object.entries(allParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        const totalPagesUrl = `${process.env.REACT_APP_BASE_URL!}/cars/total_pages${
            queryString ? `?${queryString}` : ''
        }`;

        const totalPagesResponse = await fetch(totalPagesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!totalPagesResponse.ok) {
            throw new Error('Ошибка получения количества страниц');
        }

        const { total_pages } = await totalPagesResponse.json();

        const carsUrl = `${process.env.REACT_APP_BASE_URL!}/cars${queryString ? `?${queryString}&` : '?'}page=${page}`;

        const carsResponse = await fetch(carsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!carsResponse.ok) {
            throw new Error('Ошибка получения списка машин');
        }

        const cars = await carsResponse.json();

        return {
            items: cars,
            pagination: {
                currentPage: page,
                totalPages: total_pages,
            },
        };
    } catch (error) {
        console.error('Load cars error:', error);
        return thunkAPI.rejectWithValue('Ошибка загрузки автомобилей');
    }
});

const initialState: CarsState = {
    carsList: [],
    isLoading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
    },
};

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCars.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carsList = action.payload.items;
                state.pagination = action.payload.pagination;
            })
            .addCase(loadCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default carsSlice.reducer;
