import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import CheckPro from "../pages/CheckPro";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import { Navigate } from "react-router-dom";
import UpdateUser from "../pages/UpdateUser";
import HomeWithLocation from "../pages/HomeWithLocation";
import ProDetails from "../pages/ProDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { index: true, element: <Home /> },
            {path: '/profile', element: <Profile/>},
            { path: 'login', element: <Login /> },
            {path:'updateprofile',element:<UpdateUser/>},
            { path: 'register', element: <SignUp /> },
            { path: 'dashboard', element: <Dashboard /> },
            {path: 'dashboard/checkpro', element: <CheckPro />},
            { path: 'settings', element: <Settings /> },
            { path: '*', element: <Navigate to="/" /> },
            {path: '/:country/:lang/:city', element: <HomeWithLocation />},
            {path: 'dashboard/checkpro/:proId',element:<ProDetails/>},
        ]
    },
]);
