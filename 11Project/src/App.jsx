import Addtodo from "./components/AddTodos"
import Todos from "./components/Todos"

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <Addtodo />
      <Todos />
    </div>
  );
}

export default App;
