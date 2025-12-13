import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function GitHub(){
     const thedata = useLoaderData();
    return (
        <>
        <div  className='flex flex-wrap justify-center'>
            <h1 className='bg-gray-300 text-center p-5 text-3xl m-4'>Github Followers : {thedata.followers}</h1>
            <img src={thedata.avatar_url} alt="" />
        </div>
        </>
    )
}

export default GitHub;

export const loaderGithubapi = async()=>{
    const response = await fetch('https://api.github.com/users/Harshverma1286');
    return response.json();
}