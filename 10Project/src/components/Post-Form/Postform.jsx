import React, { useCallback } from "react";

import { useForm } from "react-hook-form";
import {Button,Input,Select,Rte} from '../indexexpo';
import appwriteservice from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Postform({post}){
    const {register,handlesubmit,control,watch,setvalue,getvalues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active',
         }
    })

    const navigate = useNavigate();

    const userData = useSelector(state=>state.user.userData);

    const submit = async ()=>{
        if(post){
            const image = data.image[0] ? await appwriteservice.uploadfile(data.image[0]) : null;

            if(image){
                await appwriteservice.deletefile(post.featuredimage);
            }

            const dbpost = await appwriteservice.updatepost(post.$id,{
                ...data,
                featuredimage: image ? image.$id : undefined
            })

            if(dbpost){
                navigate(`/post/${dbpost.$id}`);
            }
        }
        else{
            const file = data.image[0] ? await appwriteservice.uploadfile(data.image[0]) : null;

            if(file){
                const fileid = file.$id;
                const dbpost = data.featuredimage = fileid;
                await appwriteservice.createpost({
                    ...data,
                    userid: userData.$id
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugtransform  = useCallback((value)=>{
        if(value && value==='string') return 
        value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
        
        return '';
    },[])

    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setvalue('slug',slugtransform(value.title,{shouldValidate:true}))
            }
        });

        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugtransform,setvalue]);
    return (
        <div></div>
    )
}

export default Postform;