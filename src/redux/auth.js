import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            token:""
        },
          reducers:{
            loginUser: (state, action)=>{
              state.token = action.payload
            },
            logOut: (state, action)=>{
              state.token = ""
            },
          }    
            
    }
);

export const { loginUser, logOut } = authSlice.actions;
export default authSlice.reducer