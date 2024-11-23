import { createSlice } from '@reduxjs/toolkit';
import type { MediaQuerySlice } from '../../interfaces/slice.interface';

type SetMediaQueryState = Pick<MediaQuerySlice, 'isSmall' | 'isMedium'>;

const initialState: MediaQuerySlice = {
    SMALL: 768,
    MEDIUM: 1200,
    isSmall: false,
    isMedium: false,
};

const mediaQuerySlice = createSlice({
    name: 'mediaQuery',
    initialState,
    reducers: {
        setMediaState(state, action) {
            state.isSmall = (action.payload as SetMediaQueryState).isSmall;
            state.isMedium = (action.payload as SetMediaQueryState).isMedium;
        },
    },
});

export const { setMediaState } = mediaQuerySlice.actions;
export default mediaQuerySlice.reducer;
