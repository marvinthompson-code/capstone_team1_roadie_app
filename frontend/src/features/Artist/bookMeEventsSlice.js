import { createSlice } from '@reduxjs/toolkit'

export const bookMeEventsSlice = createSlice({
    name: "bookMeEvents",
    initialState: [], 
    reducers: {
        recieveClientEvents: (state, action) => action.payload
        
    }
})

export const { recieveClientEvents } = bookMeEventsSlice.actions;
export default bookMeEventsSlice.reducer;