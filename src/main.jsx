import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedSignRoute from "./pages/ProtectedSignRoute";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedSignRoute>
        <Register />
      </ProtectedSignRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedSignRoute>
        <Login />
      </ProtectedSignRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    {/*<RouterProvider router={router} />*/}
    <div>hello world</div>
  </React.StrictMode>
);
