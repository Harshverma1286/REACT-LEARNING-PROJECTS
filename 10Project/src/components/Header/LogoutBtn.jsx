import React from "react";

import { useDispatch } from "react-redux";

import { logout } from "../../Store/AuthSlice";

import authservice from "../../Appwrite/auth";


function LogoutBtn(){

    const dispatch = useDispatch();

    const logouthandler = ()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        }).catch((error)=>{
            console.log("erorr occured while logging out",error);
        })
    }
    return(
        <button
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logouthandler}>Logout</button>
    )
}

export default LogoutBtn;