import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "profile", element: <Profile /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
