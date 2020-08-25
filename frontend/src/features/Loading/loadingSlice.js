import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: "loading",
    initialState: false, 
    reducers: {
        toggleLoadingState: (state) => !state
        
    }
})

export const { toggleLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;