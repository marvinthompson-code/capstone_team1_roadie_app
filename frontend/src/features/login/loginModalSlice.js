import { createSlice } from '@reduxjs/toolkit'

export const loginModalSlice = createSlice({
    name: "loginModal",
    initialState: false, 
    reducers: {
        toggleLoginModalState: (state) => !state,
        recieveModalState: (state, action) => action.payload
    }
})

export const { toggleLoginModalState, recieveModalState } = loginModalSlice.actions;
export default loginModalSlice.reducer;