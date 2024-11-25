import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PaymentSlice } from '../../interfaces/slice.interface';

const initialState: PaymentSlice = {
    initialContribution: 0,
    creditTerm: 0,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentValue: (state, action: PayloadAction<PaymentSlice>) => {
            state.creditTerm = action.payload.creditTerm;
            state.initialContribution = action.payload.initialContribution;
        },
        resetPaymentValue: (state) => {
            state.creditTerm = 0;
            state.initialContribution = 0;
        },
    },
});

export const { setPaymentValue, resetPaymentValue } = paymentSlice.actions;
export default paymentSlice.reducer;
