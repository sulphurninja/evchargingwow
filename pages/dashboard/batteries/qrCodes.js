import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import BreadCrumb from '@/components/breadcrumb';
import axios from 'axios';

const breadcrumbItems = [
    { title: "Batteries", link: "/dashboard/batteries" },
    { title: "Qr Codes", link: "/dashboard/batteries/qrCodes" },
];

export default function QrCodes() {
    const [batteryData, setBatteryData] = useState([]);

    useEffect(() => {
        const fetchBatteryData = async () => {
            try {
                const response = await axios.get('/api/getBatteries');
                setBatteryData(response.data);
            } catch (error) {
                console.error('Error fetching battery data:', error);
            }
        };
        fetchBatteryData();
    }, []);

    return (
        <Layout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {batteryData.map((battery, index) => (
                        <div key={battery._id} className="bg-white text-black w-full p-4 rounded-lg shadow-md">
                            <img src={battery.qrCode} alt={`QR Code for ${battery.serialNo}`} className="mx-auto" />
                            <p className="text-center font-bold">Sr No: {battery.serialNo}</p>
                            <p className="text-center">Manufacturer: {battery.manufacturer}</p>
                            <p className="text-center">Type: {battery.type}</p>
                            <p className="text-center">Status: {battery.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
