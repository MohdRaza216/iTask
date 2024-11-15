import { useState } from "react";
import Navbar from "./component/Navbar.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = { text: todo, completed: false };
      if (isEditing) {
        const updatedTodos = todos.map((item, index) =>
          index === editIndex ? { ...item, text: todo } : item
        );
        setTodos(updatedTodos);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setTodos([...todos, newTodo]);
      }
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this todo item?")) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    }
  };

  const handleEdit = (index) => {
    setTodo(todos[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCheckbox = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all todo items?")) {
      setTodos([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[70%]">
        <h1 className="text-3xl font-bold text-center">
          iTask - Manage your todos at one place
        </h1>
        <div className="flex flex-col gap-4 my-5 addTodo">
          <h2 className="text-2xl font-bold">What do you want to do today?</h2>
          <input
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter your todo"
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            value={todo}
          />
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="p-3 py-1 text-white bg-blue-800 rounded-full hover:bg-blue-950 w-[55%] "
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Your Todos</h2>
            <button
              className="p-3 py-1 text-white bg-red-800 rounded-md hover:bg-red-950"
              onClick={handleClear}
            >
              Clear All Todos
            </button>
          </div>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Todos to display!</div>
            )}
            {todos.map((item, index) => (
              <div className="flex justify-between w-[55%] todo" key={index}>
                <div className="flex items-baseline gap-5 checkbox">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckbox(index)}
                    className="mb-3 mr-2"
                  />
                  <div
                    className={`text ${
                      item.completed ? "line-through" : ""
                    } mb-3`}
                  >
                    {item.text}
                  </div>
                </div>
                <div className="flex h-full buttons">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-3 py-1 mx-2 mb-3 text-sm text-white bg-blue-800 rounded-md hover:bg-blue-950"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-3 py-1 mx-0 mb-3 text-sm text-white bg-red-800 rounded-md hover:bg-red-950"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
