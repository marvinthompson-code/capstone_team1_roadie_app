import { createSlice } from '@reduxjs/toolkit'

export const clientContactModalSlice = createSlice({
    name: "clientContactModal",
    initialState: false, 
    reducers: {
        toggleClientContactModalState: (state) => !state
        
    }
})

export const { toggleClientContactModalState } = clientContactModalSlice.actions;
export default clientContactModalSlice.reducer;