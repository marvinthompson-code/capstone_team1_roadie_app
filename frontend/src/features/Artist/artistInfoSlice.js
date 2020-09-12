import { createSlice } from '@reduxjs/toolkit'

export const artistInfoSlice = createSlice({
    name: "artistInfo",
    initialState: {}, 
    reducers: {
        receiveArtistInfo: (state, action) => action.payload
    }
})

export const { receiveArtistInfo } = artistInfoSlice.actions;
export default artistInfoSlice.reducer;