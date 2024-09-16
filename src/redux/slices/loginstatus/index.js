import { createSlice } from "@reduxjs/toolkit";


export const loginStatusSlice = createSlice({
    initialState: false,
    name: 'login',
    reducers:{
        login: (state) => true,
        logout: (state) => false,
    }
})

export const {login, logout} = loginStatusSlice.actions;
export default loginStatusSlice.reducer;