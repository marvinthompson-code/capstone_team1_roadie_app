import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: "error",
    initialState: false, 
    reducers: {
        toggleErrorState: (state) => !state,
        recieveState: (state, action) => action.payload
    }
})

export const { toggleErrorState, recieveState } = errorSlice.actions;
export default errorSlice.reducer;