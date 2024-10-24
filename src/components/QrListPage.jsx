"use client";

import React, { useEffect, useState } from "react";

const QrListPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [qrData, setQrData] = useState([]);
    const [selectedQRCode, setSelectedQRCode] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    const handleQRCodeClick = (qrCodeUrl) => {
        setSelectedQRCode(qrCodeUrl);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedQRCode("");
    };

    useEffect(() => {
        const fetchQRData = async () => {
            try {
                setLoading(true); // Start loading
                const res = await fetch(`https://qr-code-generator-one-theta.vercel.app/api/v1/all-qr-codes`);
                const data = await res.json();
                setQrData(data.data);
            } catch (error) {
                console.error("Error fetching QR codes:", error);
            } finally {
                setLoading(false); // End loading
            }
        };
        fetchQRData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Loader: Display while data is loading */}
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <p className="text-gray-500 ml-4">Loading QR codes...</p>
                </div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Serial No</th>
                            <th className="py-2 px-4 border-b">QR Code</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qrData.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <img
                                        src={item.qrImageUrl}
                                        alt={`QR Code ${index + 1}`}
                                        className="w-16 h-16 cursor-pointer"
                                        onClick={() => handleQRCodeClick(item.qrImageUrl)}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2">
                                        Update
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">QR Code</h2>
                        <img src={selectedQRCode} alt="QR Code" className="w-64 h-64" />
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrListPage;
