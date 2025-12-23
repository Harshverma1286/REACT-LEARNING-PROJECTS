import React, { useId, useState } from "react";
import { Container,Logo,LogoutBtn } from "../indexexpo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

function Header(){

    const currentstatus = useSelector((state)=> state.auth.status);

    const navigate = useNavigate();

    const navitems = [
        {
            name:"Home",
            slug:"/",
            active:true,
        },
        {
            name:"Login",
            slug:"/login",
            active:!currentstatus
        },
        {
            name:"Signup",
            slug:"/signup",
            active:!currentstatus
        },
        {
            name:"All Posts",
            slug:"/all-posts",
            active:currentstatus,
        },
        {
            name:"Add Post",
            slug:"/add-post",
            active:currentstatus,
        }
    ]
    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                        <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {
                            navitems.map((item)=>
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={()=> navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                                    {item.name}</button>
                                </li>
                            ) : null
                        )}
                        {currentstatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;