import { createSlice } from "@reduxjs/toolkit";

export const venueSearchSlice = createSlice({  
    name: "venueSearch",  
    initialState: [],  
    reducers: {    
        receiveVenueSearch: (state, action) => {      
            return action.payload;    
        },  
    },
});

export const { receiveVenueSearch } = venueSearchSlice.actions;
// export const searchRes = (state) => state.venueSearch;
export default venueSearchSlice.reducer;