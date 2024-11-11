import Navbar from "./component/Navbar.jsx";
function App() {
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
          />
          <div className="flex justify-center">
          <button className="p-3 py-1 text-white bg-blue-800 rounded-md hover:bg-blue-950">Add</button>

          </div>
          <h2 className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            <div className="flex todo">
              <div className="text">To watch a movie in horror genre.
              </div>
              <button className="p-2 py-1 mx-2 text-sm text-white bg-red-800 rounded-md hover:bg-red-950">Delete</button>
              <button className="p-2 py-1 mx-0 text-sm text-white bg-blue-800 rounded-md hover:bg-blue-950">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
