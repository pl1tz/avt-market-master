import adminSlice from './slice/adminSlice';
import aboutSlice from './slice/aboutSlice';
import banksListSlice from './slice/banksListSlice';
import carsSlice from './slice/carsSlice';
import contactsSlice from './slice/contactsSlice';
import editCarSlice from './slice/editCarSlice';
import favoritesSlice from './slice/favoritesSlice';
import filterSlice from './slice/filterSlice';
import inStockSlice from './slice/inStockSlice';
import lastArrivalsSlice from './slice/lastArrivalSlice';
import mediaQuerySlice from './slice/mediaQuerySlice';
import modalSlice from './slice/modalSlice';
import paymentSlice from './slice/paymentSlice';
import sortCarsSlice from './slice/sortCarsSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        admin: adminSlice,
        about: aboutSlice,
        banksList: banksListSlice,
        cars: carsSlice,
        contacts: contactsSlice,
        editCar: editCarSlice,
        favorites: favoritesSlice,
        filter: filterSlice,
        inStockList: inStockSlice,
        lastArrivalsList: lastArrivalsSlice,
        mediaQuery: mediaQuerySlice,
        modal: modalSlice,
        payment: paymentSlice,
        sortCars: sortCarsSlice,
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
