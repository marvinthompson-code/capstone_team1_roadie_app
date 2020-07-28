import { createSlice } from '@reduxjs/toolkit'
import { recieveToken } from './tokenSlice'
import { recieveArtist } from './artistTokenSlice'
import { recieveClient } from './clientTokenSlice'
import { apiURL } from '../../util/apiURL'
import { getFirebaseIdToken } from '../../util/firebaseFunctions'
import axios from 'axios'

export const userTokenSlice = createSlice({
    name: "userToken",
    initialState: null,
    reducers: {
        recieveUser: { 
            reducer: (state, action) => action.payload }
    }
})


export const updateUser = (user) => async (dispatch) => {
    // dispatch(setLoading(true))
    const API = apiURL()
    try {
        if (user) {
            const { email, lastLogin, uid } = user;
            debugger
            const token = await getFirebaseIdToken()
            let res = await axios.get(`${API}/users/${uid}`)
            debugger
            let { type } = res.data.body.single_user
            debugger
            if (type === "artist") {
                dispatch(recieveArtist({email, lastLogin, id: uid}));
            } else if (type === "client") {
                dispatch(recieveClient({email, lastLogin, id: uid}));
            }
            dispatch(recieveToken(token))
        } else {
            dispatch(recieveUser(null))
            // dispatch(recieveUser(null))
        }
        // dispatch(setLoading(false))
    } catch (error) {
        console.log("error", error)
    }
}
export const { recieveUser } = userTokenSlice.actions;
export default userTokenSlice.reducer;