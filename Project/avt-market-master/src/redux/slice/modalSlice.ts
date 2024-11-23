import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { initialStateModal } from '../selectCarInitialState';
import { scrollManager } from '../../helpers/ScrollManager';
import type { ModalName, SelectCarSection } from '../../interfaces/slice.interface';
import type { ModalPromotionData } from '../../interfaces/interface';
import type { AutoCard, CarsCount, CarsCountGenerations, CarsCountModel } from '../../interfaces/cars.interface';

const selectCarsLoader = createAsyncThunk('modal/modalSelectCarsFetch', async (url: string): Promise<AutoCard[]> => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/cars?${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
});

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialStateModal,
    reducers: {
        openModal: (state, action: PayloadAction<ModalName>) => {
            state.modals[action.payload].modalState = true;
            scrollManager.scrollOff();
        },
        closeModal: (state, action: PayloadAction<ModalName>) => {
            state.modals[action.payload].modalState = false;
            scrollManager.scrollOn();
        },

        setPromotionData(state, action: PayloadAction<Omit<ModalPromotionData, 'modalPromotionState' | 'img'>>) {
            state.modals.promotion.title = action.payload.title;
            state.modals.promotion.description = action.payload.description;
            state.modals.promotion.link = action.payload.link;
        },
        resetPromotionData(state) {
            state.modals.promotion.title = '';
            state.modals.promotion.description = '';
            state.modals.promotion.link = '';
        },

        setFilterBrand(state, action: PayloadAction<SelectCarSection<CarsCount[], CarsCountModel[]>>) {
            const { nextValue, thisValue, selected, status } = action.payload;
            const selectModal = state.modals.selectCar.filter;

            selectModal.brand.nextValue = nextValue;
            selectModal.brand.thisValue = thisValue;
            selectModal.brand.status = status;
            selectModal.brand.selected = selected;
            selectModal.model.thisValue = nextValue;

            selectModal.stage = 2;
            selectModal.model.status = true;
            selectModal.generation.status = false;
        },
        setFilterModel(state, action: PayloadAction<SelectCarSection<CarsCountModel[], CarsCountGenerations[]>>) {
            const { nextValue, thisValue, selected, status } = action.payload;
            const selectModal = state.modals.selectCar.filter;

            selectModal.model.nextValue = nextValue;
            selectModal.model.thisValue = thisValue;
            selectModal.model.status = status;
            selectModal.model.selected = selected;
            selectModal.generation.thisValue = nextValue;

            selectModal.stage = 3;
            selectModal.generation.status = true;
        },
        setFilterGeneration(state, action: PayloadAction<SelectCarSection<CarsCountGenerations[], AutoCard[]>>) {
            const { nextValue, thisValue, selected, status } = action.payload;
            const selectModal = state.modals.selectCar.filter;

            selectModal.generation.nextValue = nextValue;
            selectModal.generation.thisValue = thisValue;
            selectModal.generation.selected = selected;
            selectModal.generation.status = status;
            selectModal.car.status = status;

            selectModal.stage = 4;
        },
        setSelectCar(state, action: PayloadAction<AutoCard>) {
            state.modals.selectCar.filter.car.carSelect = action.payload;
        },
        setStageFilter(state, action: PayloadAction<number>) {
            state.modals.selectCar.filter.stage = action.payload;
        },
        resetSelectCar(state) {
            state.modals.selectCar.filter = initialStateModal.modals.selectCar.filter;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(selectCarsLoader.fulfilled, (state, action) => {
                const selectModal = state.modals.selectCar;

                selectModal.stateLoad.isLoad = false;
                selectModal.stateLoad.error = false;
                selectModal.filter.generation.nextValue = action.payload;
                selectModal.filter.car.carList = action.payload;
            })
            .addCase(selectCarsLoader.pending, (state) => {
                const selectModal = state.modals.selectCar;

                selectModal.stateLoad.isLoad = true;
                selectModal.stateLoad.error = false;
            })
            .addCase(selectCarsLoader.rejected, (state) => {
                const selectModal = state.modals.selectCar;

                selectModal.stateLoad.isLoad = false;
                selectModal.stateLoad.error = true;
            });
    },
});

export { selectCarsLoader };
export const {
    openModal,
    closeModal,
    setPromotionData,
    resetPromotionData,
    setStageFilter,
    setFilterModel,
    setFilterBrand,
    setFilterGeneration,
    setSelectCar,
    resetSelectCar,
} = modalSlice.actions;
export default modalSlice.reducer;
