import React, { useEffect, useState } from "react";

import {Container , Postcard} from '../components/indexexpo'

import appwriteservice from '../Appwrite/config';

function Allpost(){
    const[posts,setallpost] = useState([]);

    useEffect(()=>{ 
        // todo: i have putted this in use effect i will check what happens outside
        appwriteservice.getallposts([]).then((post)=>{
            if(post){
                setallpost(post.documents);
            }
        }).catch((error)=>{
            console.log(error,error.message);
        })
    },[])

 
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>
                    <div key={post.$id} className="p-2 w-1/4">
                        <Postcard post={post}/>
                    </div> 
                    )}
                </div>
            </Container>
        </div>
    )
}


export default Allpost;