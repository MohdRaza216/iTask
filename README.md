# iTask - Todo Management App

iTask is a React-based Todo management application designed to help users keep track of their tasks with ease. It features a modern interface, local storage support, and essential CRUD functionalities.

## Features

- **Add Todos**: Quickly add tasks to your list.
- **Edit Todos**: Modify tasks on the fly using an intuitive modal interface.
- **Mark as Completed**: Mark tasks as done with a single click.
- **Delete Todos**: Remove individual tasks or clear all tasks at once.
- **Filter Todos**: Toggle between viewing completed and pending tasks.
- **Local Storage Integration**: Todos persist across page reloads.

## Built With

- **Vite**: For fast and optimized development.
- **React.js**: Component-based UI development.
- **React Icons**: For attractive and consistent icons.
- **React Toastify**: For user-friendly notifications.
- **TailwindCSS**: For rapid styling and responsive design.

## Getting Started

### Prerequisites

- Node.js (>=14)
- npm (>=6) or Yarn (>=1.22)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MohdRaza216/iTask.git
   ```

2. Navigate to the project directory:

   ```bash
   cd iTask
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173`.

### Build for Production

To build the app for production, run:

```bash
npm run build
```

The built files will be located in the `dist` folder.

## Folder Structure

```plaintext
iTask/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Usage

- Start adding your tasks in the input field and press **Enter** or click the **Add** button.
- Use the checkbox to mark tasks as completed.
- Click the edit button (pencil icon) to update any task.
- Delete individual tasks or clear the entire list using the provided buttons.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License.

---
