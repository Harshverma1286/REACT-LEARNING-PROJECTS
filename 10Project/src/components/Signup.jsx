import React,{useState} from "react";

import appwriteservice from '../Appwrite/auth';
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

import {Button,Input,Logo}  from './indexexpo';

import { login } from "../Store/AuthSlice";

import { useForm } from "react-hook-form";

function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,seterror] = useState("");
    const {register,hanldesubmit} = useForm();

    const create = async(data)=>{
        seterror("");
        try {
            const response = await appwriteservice.createaccount(data);

            if(response){
                const userdata = await appwriteservice.currentuser();

                if(userdata){
                    dispatch(login(userdata));
                }
                navigate('/');
            }
        } catch (error) {
            seterror(error.message);
        }
    }

    return(
        <div className="flex item-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                            sign In
                        </Link>
                </p>   
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={hanldesubmit(create)}>
                    <div className="space-y-5">
                        <Input
                        label="Full Name: "
                        placeholder="enter your full name : "
                        {...register("name",{required:true})}
                        />
                        <Input
                        label="Email: "
                        placeholder="enter your email"
                        type="email"
                        {...register("email",{
                        required:true,
                        validate:{
                            matchPatern:(value)=> 
                                 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ || 
                            "Email address must be a valid address"
                        }
                        })}
                        />
                        <Input
                        label="password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("pasword"),{
                            required:true
                        }}
                        />
                        <Button type="submit" className="w-full">create Account</Button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Signup;
