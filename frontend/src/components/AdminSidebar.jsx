import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block bg-gray-800 text-white h-screen w-64 p-5">
                <h1 className="text-lg font-bold mb-5 border-b border-gray-600 pb-2">
                    Admin Panel
                </h1>
                <SidebarLinks />
            </div>

            {/* Top bar for mobile */}
            <div className="md:hidden w-full bg-gray-800 text-white flex items-center justify-between px-4 py-3">
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile sidebar menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 text-white w-full absolute top-12 left-0 z-10 p-5">
                    <SidebarLinks />
                </div>
            )}
        </div>
    );
};

const SidebarLinks = () => (
    <ul className="list-none p-0">
        <li className="mb-4">
            <Link
                to="/dashboard"
                className="text-white no-underline text-base"
            >
                Dashboard
            </Link>
        </li>
        <li className="mb-4">
            <Link
                to="/users"
                className="text-white no-underline text-base"
            >
                Users
            </Link>
        </li>
        <li>
            <Link
                to="/dashboard/checkpro"
                className="text-white no-underline text-base"
            >
                New Professional
            </Link>
        </li>
    </ul>
);

export default AdminSidebar;
