import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : ""
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
      
    },
});

export const {
    setUser
} = userSlice.actions;

export default userSlice.reducer;
