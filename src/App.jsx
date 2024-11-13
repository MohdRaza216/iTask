import { useState } from "react";
import Navbar from "./component/Navbar.jsx";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editIndex, setEditIndex] = useState(null); // Track index of item being edited

  const handleAdd = () => {
    if (todo) {
      const newTodo = { text: todo, completed: false }; // New to-do object with 'completed' field
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
    // else {
    //   // Do nothing if user cancels the delete operation
    // }
  };

  const handleEdit = (index) => {
    setTodo(todos[index].text); // Set only the text of the selected to-do item
    setIsEditing(true); // Set editing state to true
    setEditIndex(index); // Store index of item being edited
  };

  const handleCheckbox = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
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
            onKeyDown={(e) => e.key === "Enter" && handleAdd()} // Trigger handleAdd on Enter key press
            value={todo}
          />
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="p-3 py-1 text-white bg-blue-800 rounded-md hover:bg-blue-950"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
          <h2 className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            {todos.map((item, index) => (
              <div className="flex todo" key={index}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckbox(index)}
                  className="mb-3 mr-2"
                />
                <div className={`text ${item.completed ? "line-through" : ""} mb-3`}>
                  {item.text}
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 py-1 mx-2 mb-3 text-sm text-white bg-blue-800 rounded-md hover:bg-blue-950"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 py-1 mx-0 mb-3 text-sm text-white bg-red-800 rounded-md hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
