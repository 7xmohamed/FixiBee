import React, { useState, useEffect } from 'react';

const ProDetails = () => {
    // Fake data for now
    const [professional, setProfessional] = useState({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        role: 'professional',
        profile_picture: 'https://via.placeholder.com/150',
        id_card_front: 'https://via.placeholder.com/300x200',
        id_card_back: 'https://via.placeholder.com/300x200',
        address: '123 Main Street, City, Country',
    });

    // Placeholder for fetching data from API
    useEffect(() => {
        // Example API call (to be implemented later)
        // fetch('/api/professional/1')
        //   .then(response => response.json())
        //   .then(data => setProfessional(data))
        //   .catch(error => console.error('Error fetching professional data:', error));
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Professional Details</h1>
            <div className="flex items-center mb-5">
                <img
                    src={professional.profile_picture}
                    alt={`${professional.name}'s profile`}
                    className="w-36 h-36 rounded-full mr-5"
                />
                <div>
                    <h2 className="text-xl font-semibold">{professional.name}</h2>
                    <p><strong>Email:</strong> {professional.email}</p>
                    <p><strong>Phone:</strong> {professional.phone}</p>
                    <p><strong>Role:</strong> {professional.role}</p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">ID Card</h3>
                <div className="flex gap-5">
                    <img
                        src={professional.id_card_front}
                        alt="ID Card Front"
                        className="w-72 h-48 object-cover"
                    />
                    <img
                        src={professional.id_card_back}
                        alt="ID Card Back"
                        className="w-72 h-48 object-cover"
                    />
                </div>
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p>{professional.address}</p>
            </div>
        </div>
    );
};

export default ProDetails;