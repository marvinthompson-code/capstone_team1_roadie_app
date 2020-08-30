import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({  
    name: "notifications",  
    initialState: [],  
    reducers: {    
        recieveNotifications: (state, action) => {      
            return action.payload;    
        },
        addNotification: (state, action) => {
            state.unshift(action.payload)
        }
    },
});

export const { receiveNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;