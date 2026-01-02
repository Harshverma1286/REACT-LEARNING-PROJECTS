import React, { useCallback } from "react";

import { useForm } from "react-hook-form";
import {Button,Input,Select,Rte} from '../indexexpo';
import appwriteservice from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Postform({post}){
    const {register,handleSubmit,control,watch,setValue,getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active',
         }
    })

    const navigate = useNavigate();

    const userData = useSelector(state=>state.auth.userData);

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
                setValue('slug',slugtransform(value.title,{shouldValidate:true}))
            }
        });

        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugtransform,setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title",{
                required:true
            })}
            />
            <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug",{
                required:true
            })}
            onInput={(e)=>{
                setValue("slug",slugtransform(e.currentTarget.value),{shouldValidate:true})
            }}
            />
            <Rte
            label="Content :"
            name="content"
            control={control}
            defaultvalue={getValues("content")}
            />
            </div>
            <div className="w-1/3 px-2">
                <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                {...register("image",{required:!post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteservice.getfilepreview(post.featuredimage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select
                options={["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("status",{
                    required:"true"
                })}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500" : undefined}
                className="w-full"
                >
                    {post ? "update" :"submit"}
                </Button>
            </div>
        </form>
    )
}

export default Postform;