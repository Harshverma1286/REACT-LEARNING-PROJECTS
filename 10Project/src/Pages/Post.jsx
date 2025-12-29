import React, { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

import appwriteservice from '../Appwrite/config'

import {Button,Container} from '../components/indexexpo';

import parse from 'html-react-parser'

import { useSelector } from "react-redux";

function Post(){
    const[posts,setallpost] = useState(null);

    const {slug} = useParams();

    const navigate = useNavigate();

    const userdata = useSelector((state)=> state.auth.userdata);

    const isauthor = posts &&  userdata ? posts.userid === userdata.$id : false;

    useEffect(()=>{
        if(slug){
            appwriteservice.getpost(slug).then((post)=>{
                if(post) setallpost(post);
                else navigate("/")
            });
        }
        else navigate("/");
    },[slug,navigate]);

    const deletepost = ()=>{
        appwriteservice.deletepost(posts.$id).then((status)=>{
            if(status){
                appwriteservice.deletefile(posts.featuredimage);
                navigate("/");
            }
        })
    }


    return posts ? (
        <div className="py-8">
           <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img src={appwriteservice.getfilepreview(posts.featuredimage)} alt={posts.title} className="rounded-xl" 
                />

                {isauthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${posts.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletepost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">
                    {posts.title}
                </h1>
            </div>
            <div className="browser-css">{parse(posts.content)}</div>
            </Container> 
        </div>
    ) : null;
}

export default Post;