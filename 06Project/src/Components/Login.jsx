import React, { useContext, useState } from "react";

import Usercontext from "../Context/UserContext";




function Login(){
    const[username,setusername] = useState('');

    const [password,setpassword] = useState('');


    const { setUser } = useContext(Usercontext);


    
    const handlesubmit = (e)=>{
        e.preventDefault();
        setUser({ username, password });
    }
    return (
        <>
        <h1>Login Page:</h1>
        <input 
        placeholder="enter the name :"
        type="text"
        value={username}
        onChange={(e)=> setusername(e.target.value)}
        />
        <input type="text" placeholder="enter the password :"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
         />
         <button type="submit" onClick={handlesubmit}>Submit</button>
        </>
    )
}

export default Login;