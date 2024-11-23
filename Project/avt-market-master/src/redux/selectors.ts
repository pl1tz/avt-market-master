import type { RootState } from './store';

export const aboutSelector = (state: RootState) => state.about;
export const adminSelector = (state: RootState) => state.admin;
export const banksListSelector = (state: RootState) => state.banksList;
export const carsSelector = (state: RootState) => state.cars;
export const contactsSelector = (state: RootState) => state.contacts;
export const editCarSelector = (state: RootState) => state.editCar;
export const favoritesSelector = (state: RootState) => state.favorites;
export const filtersSelector = (state: RootState) => state.filter;
export const inStockListSelector = (state: RootState) => state.inStockList;
export const lastArrivalsSelector = (state: RootState) => state.lastArrivalsList;
export const mediaQuerySelector = (state: RootState) => state.mediaQuery;
export const modalSelector = (state: RootState) => state.modal.modals;
export const paymentSelector = (state: RootState) => state.payment;
export const sortSelector = (state: RootState) => state.sortCars;
