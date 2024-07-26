 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    search : [],
    userData: []
}

const APISlice = createSlice({
    name : "Api",
    initialState,
    reducers: {
        updateUserData: (state, action) => {
          state.userData = action.payload;
        },
        updateSearch: (state, action) => {
          state.search = action.payload;
        },
      },
})

export const { updateUserData, updateSearch } = APISlice.actions;
export default APISlice.reducer;