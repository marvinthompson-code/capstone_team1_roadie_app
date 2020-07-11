import { createSlice } from '@reduxjs/toolkit'
import { getFirebaseIdToken } from '../../util/firebaseFunctions'
import { recieveToken } from '../token/tokenSlice'

export const artistSlice = createSlice({
    name: "artist",
    initialState: null,
    reducers: {
        recieveArtist: {
            reducer: (action, state) => action.payload
        },
        logout: {
            reducer: (state) => null
        }
    }
})

export const updateArtist = (user) => async (dispatch) => {
    // dispatch(setLoading(true))
    try {
        if (user) {
            const { email, uid } = user;
            const lastLogin = user.metadata.lastSignInTime;
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

export const { recieveArtist, logout } = artistSlice.actions;
export default artistSlice.reducer;