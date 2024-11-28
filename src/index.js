import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskProvider } from "./context/taskCtx";
import LoginContainer from "./pages/login/loginContainer";
import RegisterContainer from "./pages/register/registerContainer";
import TasksContainer from "./pages/TaskList/taskListContainer";
import AddTaskContainer from "./pages/addTask/addTaskContainer";
import EditTaskContainer from "./pages/editTask/editTaskContainer";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <LoginContainer /> },
  { path: "/login", element: <LoginContainer /> },
  { path: "/register", element: <RegisterContainer /> },
  { path: "/tasks", element: <TasksContainer/> },
  { path: "/addtask", element: <AddTaskContainer /> },
  { path: "/edit/:id", element: <EditTaskContainer /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
