// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <SignUp /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: '*', element: <Navigate to="/" /> }
        ]
    }
]);
