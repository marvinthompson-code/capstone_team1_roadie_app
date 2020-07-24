import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({  
    name: "search",  
    initialState: [],  
    reducers: {    
        receiveSearch: (state, action) => {      
            return action.payload;    
        },  
    },
});

export const { receiveSearch } = searchSlice.actions;
export const searchRes = (state) => state.search;
export default searchSlice.reducer;