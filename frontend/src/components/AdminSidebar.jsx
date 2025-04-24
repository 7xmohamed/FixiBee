import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen w-64 p-5">
            <h1 className="text-lg font-bold mb-5 border-b border-gray-600 pb-2">
                Admin Panel
            </h1>
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
        </div>
    );
};

export default AdminSidebar;
