import {createSlice} from '@reduxjs/toolkit';

export const uploadVideoModalSlice = createSlice({
    name: "uploadVideoModal",
    initialState: false,
    reducers: {
        toggleModalState: (state) => !state
    }
});

export const {toggleModalState} = uploadVideoModalSlice.actions;
export default uploadVideoModalSlice.reducer;