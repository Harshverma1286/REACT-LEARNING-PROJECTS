import React, { useEffect, useState } from "react";
import {Container,Postform} from '../components/indexexpo';
import appwriteservice from '../Appwrite/config';
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [posts,setposts] = useState(null);

    const {slug} = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        if(slug){
            appwriteservice.getpost(slug).then((post)=>{
                if(post){
                    setposts(post);
                }
            })
        }
        else{
            navigate('/');
        }
    },[slug,navigate]);
    return posts ? (
        <div className="py-8">
            <Container>
                <Postform post={posts}/>
            </Container>  
        </div>
    ) : null;
}

export default EditPost;