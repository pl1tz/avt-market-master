import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortBankByBestOffers } from '../../helpers/bank/sortBankByBestOffers ';
import type { BanksListSlice } from '../../interfaces/slice.interface';
import type { Bank } from '../../interfaces/banks.interface';

const initialState: BanksListSlice = {
    banksList: [],
    bestOffersBanks: [],
    stateLoad: {
        isLoad: false,
        error: false,
    },
    targetProgramId: null,
    targetBankId: null,
};

const banksListLoader = createAsyncThunk('banksList/fetchBanksList', async (): Promise<Bank[]> => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/banks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
});

const banksListSlice = createSlice({
    name: 'banksList',
    initialState,
    reducers: {
        setTargetBankId: (state, action: PayloadAction<number | null>) => {
            state.targetBankId = action.payload;
        },
        setTaretProgramId: (state, action: PayloadAction<number | null>) => {
            state.targetProgramId = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(banksListLoader.fulfilled, (state, action) => {
                state.bestOffersBanks = sortBankByBestOffers(action.payload).slice(0, 5);
                state.banksList = action.payload;
                state.stateLoad.error = false;
                state.stateLoad.isLoad = false;
            })
            .addCase(banksListLoader.pending, (state) => {
                state.stateLoad.error = false;
                state.stateLoad.isLoad = true;
            })
            .addCase(banksListLoader.rejected, (state) => {
                state.stateLoad.error = true;
                state.stateLoad.isLoad = false;
            });
    },
});

export { banksListLoader };
export const { setTargetBankId, setTaretProgramId } = banksListSlice.actions;
export default banksListSlice.reducer;
