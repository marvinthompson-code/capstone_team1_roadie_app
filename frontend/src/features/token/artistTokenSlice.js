import { createSlice } from '@reduxjs/toolkit'
import { recieveToken } from './tokenSlice'
import { getFirebaseIdToken } from '../../util/firebaseFunctions'

export const artistSlice = createSlice({
    name: "artist",
    initialState: null,
    reducers: {
        recieveArtist: { 
            reducer: (state, action) => action.payload },
        artistLogout: {
            reducer: (state) => null
        }
    }
})

export const asyncLogout = () => (dispatch) => {
    dispatch(artistLogout())
}


export const updateArtist = (user) => async (dispatch) => {
    // dispatch(setLoading(true))
    try {
        if (user) {
            debugger
            const { email, uid } = user;
            const lastLogin = user.metadata.lastSignInTime;
            debugger
            dispatch(recieveArtist({email, lastLogin, id: uid}));
            const token = await getFirebaseIdToken()
            dispatch(recieveToken(token))
        } else {
            dispatch(recieveArtist(null))
        }
        // dispatch(setLoading(false))
    } catch (error) {
        console.log("error", error)
    }
}

export const { recieveArtist, artistLogout } = artistSlice.actions;
export default artistSlice.reducer;

