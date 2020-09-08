import { createSlice } from '@reduxjs/toolkit'

export const clientInfoSlice = createSlice({
    name: "clientInfo",
    initialState: null, 
    reducers: {
        receiveClientInfo: (state, action) => action.payload
    }
})

export const { receiveClientInfo } = clientInfoSlice.actions;
export default clientInfoSlice.reducer;