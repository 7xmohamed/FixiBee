import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const CheckPro = () => {
    const navigate = useNavigate();
    const [professionals, setProfessionals] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            service: "Plumbing",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            service: "Electrician",
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike.johnson@example.com",
            phone: "456-789-1234",
            service: "Carpentry",
        },
    ]);

    const handleReject = (id) => {
        console.log("Rejected professional with ID:", id);
    };

    const handleAccept = (id) => {
        console.log("Accepted professional with ID:", id);
    };

    const handleDetails = (id) => {
        navigate(`/dashboard/checkpro/${id}`);
    };

    return (
        <>
            
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Professionals</h1>
                <div className="overflow-x-auto"></div>
                    <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professionals.map((pro) => (
                                <tr key={pro.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{pro.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pro.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pro.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pro.service}</td>
                                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleReject(pro.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleAccept(pro.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDetails(pro.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        
    );
};

export default CheckPro;