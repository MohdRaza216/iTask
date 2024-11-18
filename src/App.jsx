import { useEffect, useState } from "react";
import Navbar from "./component/Navbar.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
// To prevent initial overwriting
const [isLoaded, setIsLoaded] = useState(false);

// Load todos from localStorage on initial render
useEffect(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log("Loaded todos from localStorage:", savedTodos);
  setTodos(savedTodos);
  setIsLoaded(true); // Indicate that initial loading is complete
}, []);

// Save todos to localStorage when `todos` changes
useEffect(() => {
  if (isLoaded) {
    console.log("Saving todos to localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}, [todos, isLoaded]);

  
  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = { id: uuidv4(), text: todo.trim(), completed: false };
      const isDuplicate = todos.some((item) => item.text === todo.trim());
      if (isDuplicate) {
        toast.error("This task already exists!");
        return;
      }
      setTodos([...todos, newTodo]);
      toast.success("Todo added successfully!");
      setTodo("");
    }
    if (!todo.trim()) {
      toast.warn("Todo cannot be empty!");
      return;
    }
  };
  

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this todo item?")) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      toast.error("Todo deleted successfully!");
    }
  };

  const handleEditModal = (index) => {
    setEditTodo(todos[index].text);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editTodo.trim()) {
      const updatedTodos = todos.map((item, index) =>
        index === editIndex ? { ...item, text: editTodo.trim() } : item
      );
      setTodos(updatedTodos);
      toast.success("Todo updated successfully!");
      setIsModalOpen(false);
      setEditTodo("");
    };
    if (!editTodo.trim()) {
      toast.warn("Todo cannot be empty!");
      return;
    }
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
      toast.error("All todos cleared successfully!");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[55%]">
        <h1 className="text-3xl font-bold text-center">
          iTask - Manage your todos at one place
        </h1>
        <div className="flex flex-col gap-4 my-5 addTodo">
          <h2 className="text-2xl font-bold">What do you want to do today?</h2>
          <input
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter your todo"
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            value={todo}
          />
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="p-3 py-1 text-white bg-blue-800 rounded-full hover:bg-blue-950 w-[55%] "
            >
              Add
            </button>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              id="showFinished"
              name="showFinished"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
            />
            <label htmlFor="showFinished" className="mx-2">
              Show Finished Todos
            </label>
          </div>
          <div className="h-[1px] bg-black opacity-15"></div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Your Todos</h2>
            <button
              className="p-3 py-1 text-white bg-red-800 rounded-md hover:bg-red-950"
              onClick={handleClear}
            >
              Clear List
            </button>
          </div>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5 text-center text-gray-500">
                Start by adding your first task!
              </div>
            )}

            {todos.map(
              (item, index) =>
                (showFinished || !item.completed) && (
                  <div className="flex justify-between todo" key={item.id}>
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
                        aria-label={`Edit todo: ${item.text}`}
                        onClick={() => handleEditModal(index)}
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
                )
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal">

          <div className="p-5 bg-white rounded-md">
            <h2 className="text-xl font-bold">Edit Todo</h2>
            <input
              id="editTodoInput"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="w-full p-2 my-3 border border-gray-300 rounded-md"
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-white bg-red-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="p-2 text-white bg-blue-600 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
