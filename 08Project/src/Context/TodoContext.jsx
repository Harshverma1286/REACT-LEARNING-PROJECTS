import React, { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo:"Todo msg",
            completed:false
        }
    ],
    addtodo:(todo)=>{},
    updatetodo:(id,todo)=>{},
    toggletodo:(id)=>{},
    deletetodo:(id)=>{}
})

export const TodoProvider = TodoContext.Provider;


export const useTodo = ()=>{
    return useContext(TodoContext);
}