import { createSlice } from '@reduxjs/toolkit'

export const editArtistProfileModalSlice = createSlice({
    name: "editArtistProfileModal",
    initialState: false, 
    reducers: {
        toggleEditArtistProfileModalState: (state) => !state
    }
})

export const { toggleEditArtistProfileModalState} = editArtistProfileModalSlice.actions;
export default editArtistProfileModalSlice.reducer;