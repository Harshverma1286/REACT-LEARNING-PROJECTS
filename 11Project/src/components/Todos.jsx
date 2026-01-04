
import React, { useState } from "react";

import { useDispatch , useSelector } from "react-redux";

import { removetodo,updatetodo } from "../Slices/TodoSlice";

function Todos(){

    const dispatch = useDispatch();

    const todos = useSelector((state)=>state.todo.todos);
    const [todoid,settodoid] = useState(null);
    const [todotext,settodotext] = useState('');


    return(
        <>
        <div className="text-2xl font-bold mb-4 text-gray-800">todos</div>
        {todos.map((todo) => (
            <li 
            key={todo.id}
            className="flex items-center justify-between bg-white p-3 mb-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
            {todoid==todo.id ? (
                <input type="text" value={todotext} onChange={(e)=> settodotext(e.target.value)} />
            ):
            <div>
                {todo.text}
            </div>
            }
            <div>
                {todoid==todo.id ? (
                    <button
                    onClick={()=> {
                        dispatch(updatetodo({
                        id:todoid,
                        text:todotext,
                    }))
                    settodoid(null);
                        }
                    }
                    >
                        save
                    </button>
                ) :
                (
                    <button
                    onClick={()=>{
                        settodoid(todo.id);
                        settodotext(todo.text);
                    }}>
                        edit
                    </button>
                )}
            </div>
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