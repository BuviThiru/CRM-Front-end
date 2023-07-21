import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "tokenCred",
    initialState : "",
    reducers: {
       getToken :(state,action)=>{
        state = localStorage.getItem("token")
       },
       clearToken : (state,action)=>{
        state = ""
       }
    }
})

export const {getToken,clearToken} = appSlice.actions
export default appSlice.reducer;