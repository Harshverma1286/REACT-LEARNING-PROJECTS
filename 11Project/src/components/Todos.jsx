
import React from "react";

import { useDispatch , useSelector } from "react-redux";

import { removetodo } from "../Slices/TodoSlice";

function Todos(){

    const dispatch = useDispatch();

    const todos = useSelector((state)=>state.todo.todos);


    return(
        <>
        <div className="text-2xl font-bold mb-4 text-gray-800">todos</div>
        {todos.map((todo) => (
            <li 
            key={todo.id}
            className="flex items-center justify-between bg-white p-3 mb-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
            <span className="text-gray-700">{todo.text}</span>
            <button 
                onClick={() => dispatch(removetodo(todo.id))}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition-colors"
            >
                X
            </button>
            </li>
        ))}
        </>
    )
}


export default Todos;