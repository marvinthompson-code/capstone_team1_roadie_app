import { createSlice } from "@reduxjs/toolkit";

export const userTypeSlice = createSlice({  
    name: "userType",  
    initialState: null,  
    reducers: {    
        receiveUserType: (state, action) => {      
            return action.payload;    
        },  
    },
});

export const { receiveUserType } = userTypeSlice.actions;
export default userTypeSlice.reducer;