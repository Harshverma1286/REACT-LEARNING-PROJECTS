import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[
        {
            id:1,
            text:"hello people"
        }
    ]
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addtodo:(state,action)=>{
            const todo = {
                id:nanoid,
                text:action.payload,
            }

            state.todos.push(todo);
        },
        removetodo:(state,action)=>{

            state.todos = state.todos.filter((todo)=> todo.id!==action.payload);
        },
        updatetodo:(state,action)=>{
            const {id,text} = action.payload;
            const value = state.todos.find((todo)=>todo.id==id);

            if(value){
                todo.text = text;
            }
        }
    }
}
)

export const {addtodo,removetodo,updatetodo} = authSlice.actions;

export default authSlice.reducer;