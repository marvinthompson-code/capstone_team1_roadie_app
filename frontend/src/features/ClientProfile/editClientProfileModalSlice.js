import { createSlice } from '@reduxjs/toolkit'

export const editClientProfileModalSlice = createSlice({
    name: "editClientProfileModal",
    initialState: false, 
    reducers: {
        toggleEditClientProfileModalState: (state) => !state
    }
})

export const { toggleEditClientProfileModalState} = editClientProfileModalSlice.actions;
export default editClientProfileModalSlice.reducer;