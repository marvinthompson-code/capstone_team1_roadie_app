import { createSlice } from '@reduxjs/toolkit'

export const eventModalSlice = createSlice({
    name: "eventModal",
    initialState: false, 
    reducers: {
        toggleEventModalState: (state) => !state
        
    }
})

export const { toggleEventModalState } = eventModalSlice.actions;
export default eventModalSlice.reducer;