import { createSlice } from '@reduxjs/toolkit'
import { recieveToken } from './tokenSlice'
// import { apiURL } from '../../util/apiURL'
import { getFirebaseIdToken } from '../../util/firebaseFunctions'
import axios from 'axios'

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        recieveUser: { 
            reducer: (state, action) => action.payload }
    }
})


export const updateUser = (user) => async (dispatch) => {
    // dispatch(setLoading(true))
    try {
        if (user) {
            const { email, lastLogin, uid } = user;
            const token = await getFirebaseIdToken()
            // let res = await axios.get(`${API}/users/${uid}`)
            // 
            // dispatch(recieveClient({email, lastLogin, id: uid}));
            dispatch(recieveToken(token))
        } else {
            // dispatch(recieveClient(null))
        }
        // dispatch(setLoading(false))
    } catch (error) {
        console.log("error", error)
    }
}