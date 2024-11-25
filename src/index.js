import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/Login/login";
import RegisterPage from "./pages/Register/register";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/TaskList/tasklist";
import { TaskProvider } from "./context/taskCtx";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/tasks", element: <TaskPage /> },
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
