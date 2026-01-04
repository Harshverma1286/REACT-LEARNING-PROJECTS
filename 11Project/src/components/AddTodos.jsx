import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addtodo } from "../Slices/TodoSlice";

function Addtodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addtodo(input));
    setInput("");
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="mt-10 flex gap-3 w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Enter a todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-5 py-2 rounded-lg bg-gray-900
                   border border-gray-700 text-white
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600
                   text-white font-semibold
                   px-6 py-2 rounded-lg transition"
      >
        Add
      </button>
    </form>
  );
}

export default Addtodo;
