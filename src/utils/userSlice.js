import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    userType: '', 
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      addUser: (state, action) => {       
        console.log("INSIDE SLICE",action.payload)
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userType = action.payload.userType;
        console.log("STATE",state.name)
       
      },
      removeUser: (state) => {
        state.name = '';
        state.email = '';
        state.password = '';
        state.userType = '';
        state.userStatus = '';
      },
    },
  });
  
  export const { addUser, removeUser } = userSlice.actions;
  export default userSlice.reducer;
