import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useParams } from 'react-router-dom';

const ProDetails = () => {
    const { proId } = useParams(); 
    const baseurl = import.meta.env.VITE_API_IMAGE_URL;
    parseInt(proId, 10);
    const [loading, setLoading] = useState(true);
    const [professional, setProfessional] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProfessionalDetails = async () => {
            try {
                const response = await api.get(`/dashboard/checkpro/${proId}`); 
                setProfessional(response.data);

                // Check if images exist and wait for them to load
                const imagesToLoad = [];
                if (response.data.profile_picture) {
                    imagesToLoad.push(`${baseurl}/${response.data.profile_picture}`);
                }
                if (response.data.id_card_front) {
                    imagesToLoad.push(`${baseurl}/${response.data.id_card_front}`);
                }
                if (response.data.id_card_back) {
                    imagesToLoad.push(`${baseurl}/${response.data.id_card_back}`);
                }

                if (imagesToLoad.length > 0) {
                    await Promise.all(
                        imagesToLoad.map(
                            (src) =>
                                new Promise((resolve) => {
                                    const img = new Image();
                                    img.src = src;
                                    img.onload = resolve;
                                    img.onerror = resolve; // Resolve even if the image fails to load
                                })
                        )
                    );
                }
            } catch (error) {
                console.error('Error fetching professional details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessionalDetails();
    }, [proId]);

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Professional Details</h1>
            <div className="flex items-center mb-5">
                <img
                    src={`${baseurl}/${professional.profile_picture}`}
                    alt={`${professional.name}'s profile`}
                    className="w-36 h-36 rounded-full mr-5"
                />
                <div>
                    <h2 className="text-xl font-semibold">{professional.name}</h2>
                    <p><strong>Email:</strong> {professional.email}</p>
                    <p><strong>Phone:</strong> {professional.phone}</p>
                    <p><strong>Role:</strong> {professional.role}</p>
                    <p><strong>Address:</strong>{professional.address}</p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">ID Card</h3>
                <div className="flex gap-5">
                    <img
                        src={`${baseurl}/${professional.id_card_front}`}
                        alt="ID Card Front"
                        className="w-72 h-48 object-cover cursor-pointer"
                        onClick={() => openImageModal(`${baseurl}/${professional.id_card_front}`)}
                    />
                    <img
                        src={`${baseurl}/${professional.id_card_back}`}
                        alt="ID Card Back"
                        className="w-72 h-48 object-cover cursor-pointer"
                        onClick={() => openImageModal(`${baseurl}/${professional.id_card_back}`)}
                    />
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
                    <button
                        className="absolute top-5 right-5 text-white text-2xl font-bold bg-red-500 rounded-full w-10 h-10 flex items-center justify-center z-50"
                        onClick={closeImageModal}
                    >
                        X
                    </button>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-full max-h-screen"
                    />
                </div>
            )}
        </div>
    );
};

export default ProDetails;
