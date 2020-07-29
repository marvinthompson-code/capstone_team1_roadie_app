import { createSlice } from '@reduxjs/toolkit'

export const bookMeModalSlice = createSlice({
    name: "bookMeModal",
    initialState: false, 
    reducers: {
        toggleBookMeModalState: (state) => !state
        
    }
})

export const { toggleBookMeModalState } = bookMeModalSlice.actions;
export default bookMeModalSlice.reducer;