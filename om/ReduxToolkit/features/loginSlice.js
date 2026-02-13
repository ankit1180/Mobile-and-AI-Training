import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login : false,
}

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers:{
        ManagingLogin: (state) =>{
             
            state.login = true;
        },
        logout: (state) =>{
            state.login = false;
        }
    }
});

export const {ManagingLogin,logout} = LoginSlice.actions;

export default LoginSlice.reducer;