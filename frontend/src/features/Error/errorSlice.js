import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: "error",
    initialState: false, 
    reducers: {
        toggleErrorState: (state) => !state
    }
})

export const { toggleErrorState} = errorSlice.actions;
export default errorSlice.reducer;