import { createSlice } from '@reduxjs/toolkit'

export const clientInfoSlice = createSlice({
    name: "clientInfo",
    initialState: {}, 
    reducers: {
        receiveClientInfo: (state, action) => action.payload
    }
})

export const { receiveClientInfo } = clientInfoSlice.actions;
export default clientInfoSlice.reducer;