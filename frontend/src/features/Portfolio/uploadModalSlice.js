import {createSlice} from '@reduxjs/toolkit';

export const uploadModalSlice = createSlice({
    name: "uploadModal",
    initialState: false,
    reducers: {
        toggleModalState: (state) => !state
    }
});

export const {toggleModalState} = uploadModalSlice.actions;
export default uploadModalSlice.reducer;