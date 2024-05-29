import LayoutVendor from '@/components/layoutVendor'
import { Card, CardHeader } from '@/components/ui/card'
import { DataContext } from '@/store/GlobalState';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

export default function Availablestock() {
    const [batteryData, setBatteryData] = useState([]);
    const [vendorCode, setVendorCode] = useState('');
    const { state = {}, dispatch } = useContext(DataContext);
    const { auth = {} } = state;
    // console.log(auth.vendor.vendorCode, 'vendor')

    useEffect(() => {
        setVendorCode(auth.vendor.vendorCode);
        localStorage.setItem('vendorCode', auth.vendor.vendorCode);

    }, [auth.vendor]);

    useEffect(() => {
        const fetchBatteryData = async () => {
            try {
                const response = await axios.get(`/api/getFullBatteries?vendorCode=${vendorCode}`);
                setBatteryData(response.data);
            } catch (error) {
                console.error('Error fetching battery data:', error);
            }
        };
        fetchBatteryData();
    }, [vendorCode]);
    
    console.log(batteryData, 'battery')
    return (
        <LayoutVendor>
            <div className='p-4'>
                <h1 className='text-center font-bold'>Available Stock</h1>
                <Card className='mt-4'>
                    <CardHeader >Currently Full Batteries</CardHeader>
                    <div className='md:grid grid-cols-3 gap-4 p-4'>
                        {batteryData.map((battery, index) => (
                            <div key={index} className=' p-4 bg-secondary rounded-md'>
                                <div className='flex gap-2'>
                                    <h1>{index + 1}.</h1>
                                    <h1>Sr.No: <strong>{battery.serialNo}</strong></h1>
                                </div>
                                <div className='flex gap-2'>
                                    <h1>Status: <span className={`${battery.status === "not issued" ? "text-slate-300 " : battery.status === "user" ? "text-green-400" : "text-amber-400"} font-bold`}>{battery.status}</span></h1>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </Card>
            </div>
        </LayoutVendor>
    )
}
