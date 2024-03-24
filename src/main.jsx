import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedSignRoute from "./pages/ProtectedSignRoute";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";

const router = createHashRouter([
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
  {
    path: "/forgotpassword",
    element: (
      <ProtectedSignRoute>
        <ForgotPassword />
      </ProtectedSignRoute>
    ),
  },
  {
    path: "/updatepassword",
    element: <UpdatePassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
