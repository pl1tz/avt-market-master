import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../helpers/customFetch';
import type { ContactsSlice } from '../../interfaces/slice.interface';
import type { ContactsType } from '../../interfaces/interface';

const initialState: ContactsSlice = {
    contacts: {
        id: 0,
        phone: 0,
        mode_operation: '',
        auto_address: '',
    },
    stateLoad: {
        isLoading: false,
        error: false,
    },
};

export const loadContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const response = await customFetch<ContactsType>({
        url: 'contacts',
        method: 'GET',
    });
    return response;
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadContacts.fulfilled, (state, action) => {
                state.stateLoad.isLoading = false;
                state.stateLoad.error = false;
                state.contacts = action.payload;
            })
            .addCase(loadContacts.pending, (state) => {
                state.stateLoad.isLoading = true;
                state.stateLoad.error = false;
            })
            .addCase(loadContacts.rejected, (state) => {
                state.stateLoad.isLoading = false;
                state.stateLoad.error = true;
            });
    },
});

export default contactsSlice.reducer;
