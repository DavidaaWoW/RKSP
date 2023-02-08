import { createSlice } from '@reduxjs/toolkit';

const termsFormSlice = createSlice({
    name: 'termsForm',
    initialState: {
        buttonStatus: true,

    },
    reducers: {
        changeButtonStatus(state, action){
            state.buttonStatus = !state.buttonStatus;
        },
    },
});

export const {changeButtonStatus} = termsFormSlice.actions;

export default termsFormSlice.reducer;