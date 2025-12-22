import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    status:"false",
    userdata:null,
}

const authslice = createSlice({
    name:"auth",
    initialstate,
    reducer:{
        login:(state,action)=>{
            state.status = "true";
            state.userdata = action.payload.userdata;
        },
        logout:(state,action)=>{
            state.status = "false";
            state.userdata = null;
        }
    }
})

export const {login,logout} = authslice.actions;

export default authslice.reducer;