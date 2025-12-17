import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context';
import TodoForm from './components/Todoform';
import TodoItem from './components/Todoitem';

function App() {
  const [todo,settodo] = useState([]);


  const addtodo = (todo)=>{
    settodo((prevtodo)=> [{id:Date.now(),...todo},...prevtodo]);
  }

    const updatetodo = (id, todo) => {
      settodo((prevtodo) =>
        prevtodo.map((item) =>
          item.id === id
            ? { ...item, todo: todo }
            : item
        )
      );
    };

    const toggletodo = (id) => {
      settodo((prevtodo) =>
        prevtodo.map((item) =>
          item.id === id
            ? { ...item, completed: !item.completed }
            : item
        )
      );
    };

  const deletetodo = (id)=>{
    settodo((prevtodo)=> prevtodo.filter((eachval)=> eachval.id!==id))
  }

    useEffect(()=>{
      const localstorageitem = JSON.parse(localStorage.getItem("todos"));

      if(localstorageitem && localstorageitem.length>0){
        settodo(localstorageitem);
      }
    },[])

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todo));
    },[todo])

  return (
    <TodoProvider value={{todo,addtodo,updatetodo,toggletodo,deletetodo}}>
         <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todo.map((todo)=> (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
        </div>
    </TodoProvider>
  )
}

export default App
