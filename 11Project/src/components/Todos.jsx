import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removetodo, updatetodo } from "../Slices/TodoSlice";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const [todoid, settodoid] = useState(null);
  const [todotext, settodotext] = useState("");

  return (
    <div className="mt-10 w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-200 text-center">
        Todo List
      </h2>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between
                       bg-gray-900 p-4 rounded-lg
                       border border-gray-800 shadow"
          >
            <div className="flex-1 mr-4">
              {todoid === todo.id ? (
                <input
                  value={todotext}
                  onChange={(e) => settodotext(e.target.value)}
                  className="w-full px-3 py-1 rounded
                             bg-gray-800 text-white
                             border border-gray-700
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-gray-100">{todo.text}</span>
              )}
            </div>

            <div className="flex gap-2">
              {todoid === todo.id ? (
                <button
                  onClick={() => {
                    dispatch(updatetodo({ id: todoid, text: todotext }));
                    settodoid(null);
                    settodotext("");
                  }}
                  className="bg-green-500 hover:bg-green-600
                             text-white px-3 py-1 rounded transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    settodoid(todo.id);
                    settodotext(todo.text);
                  }}
                  className="bg-blue-500 hover:bg-blue-600
                             text-white px-3 py-1 rounded transition"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(removetodo(todo.id))}
                className="bg-red-500 hover:bg-red-600
                           text-white px-3 py-1 rounded transition"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
