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
          console.log(state.userData)
        },
        updateSearch: (state, action) => {
          state.search = action.payload;
          console.log(state.search)
        },
      },
})

export const { updateUserData, updateSearch } = APISlice.actions;
export default APISlice.reducer;