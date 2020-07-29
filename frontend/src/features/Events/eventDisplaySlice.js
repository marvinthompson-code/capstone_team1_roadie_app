import { createSlice } from '@reduxjs/toolkit'

export const eventDisplaySlice = createSlice({
    name: "eventDisplay",
    initialState: false, 
    reducers: {
        toggleEventDisplayState: (state) => !state
    }
})

export const { toggleEventDisplayState } = eventDisplaySlice.actions;
export default eventDisplaySlice.reducer;