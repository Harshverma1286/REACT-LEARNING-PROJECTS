import React from "react";
import { useParams } from "react-router-dom";

function User(){
    const {userid} = useParams();
    return(
        <h1 className='bg-gray-400 text-center p-4 m-5'>User:{userid}</h1>
    )
}

export default User;