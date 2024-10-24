"use client";

import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const UserForm = () => {
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;

        const payload = { name, email, phone };

        // Basic validation
        if (!name) {
            return toast.error('Name is required');
        } else if (!email) {
            return toast.error('Email is required');
        } else if (!phone) {
            return toast.error('Phone number is required');
        }

        setLoader(true); // Set loader state before the request
        try {
            let res = await axios.post(`https://qr-code-generator-one-theta.vercel.app/api/v1/generate-qr-code`, payload);
            if (res.data.status === "success") {
                toast.success('QR Code has been generated successfully');
            } else {
                toast.error('Failed to generate QR Code');
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form');
            console.error(error); // Log error for debugging
        } finally {
            setLoader(false); // Reset loader state after request
        }
        e.target.reset()
    };

    return (
        <>
            <div className="flex justify-center items-center py-8 bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                id="name"
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="number"
                                name='phone'
                                id="phone"
                                placeholder="Enter your phone number"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full ${loader ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold py-2 rounded-md transition duration-200`}
                            disabled={loader} // Disable button while loading
                        >
                            {loader ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <Toaster position='top-center' />
        </>
    );
};

export default UserForm;
