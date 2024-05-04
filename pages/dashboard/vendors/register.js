import BreadCrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import { DataContext } from '@/store/GlobalState';
import { postData } from '@/utils/fetchData';
import { Battery, User } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'sonner';

const breadcrumbItems = [
    { title: "Vendors", link: "/dashboard/vendors" },
    { title: "Register Vendor", link: "/dashboard/vendors/register" },
];

export default function Register() {
    const initialState = { password: '', vendorName: '', vendorAddress: '', contactPersonName: '', vendorEmail: '', contactPersonMobNo: '', batteriesAssigned: [] }
    const [vendorData, setVendorData] = useState(initialState)
    const [batteries, setBatteries] = useState([]);
    const [showBatteryDropdown, setShowBatteryDropdown] = useState(false);
    const { vendorName, vendorEmail, password, vendorAddress, contactPersonName, contactPersonMobNo, batteriesAssigned } = vendorData
    const { state, dispatch } = useContext(DataContext)
    const router = useRouter();

    useEffect(() => {
        // Fetch batteries with status 'not issued'
        const fetchBatteries = async () => {
            try {
                const res = await fetch('/api/batteries'); // Adjust the API route as per your backend setup
                const data = await res.json();
                setBatteries(data);
            } catch (error) {
                console.error('Error fetching batteries:', error);
            }
        };

        fetchBatteries();
    }, []);

    const handleChangeInput = e => {
        const { name, value } = e.target
        setVendorData({ ...vendorData, [name]: value })
    }

    const handleBatterySelection = (batteryId) => {
        const index = vendorData.batteriesAssigned.indexOf(batteryId);
        if (index === -1) {
            // Battery not in the list, add it
            if (vendorData.batteriesAssigned.length < 6) {
                setVendorData(prevState => ({
                    ...prevState,
                    batteriesAssigned: [...prevState.batteriesAssigned, batteryId]
                }));
            } else {
                // Maximum number of batteries reached
                toast('You can assign up to 6 batteries.');
            }
        } else {
            // Battery already in the list, remove it
            setVendorData(prevState => ({
                ...prevState,
                batteriesAssigned: prevState.batteriesAssigned.filter(id => id !== batteryId)
            }));
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await postData('auth/registerVendor', vendorData)
        if (res.msg === 'Vendor registration successful!') {
            toast('Vendor Registered Successfully! ✅')
            setVendorData(initialState);
            // Redirect to vendor list page
            router.push('/dashboard/vendors');
        } else {
            toast(res.err);
            setVendorData(initialState);
        }
    }

    return (
        <Layout>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <Heading
                    title={`Register a Vendor 👤`}
                    description="Enter the following details to register a vendor"
                />
                <form onSubmit={handleSubmit} className='border grid md:grid-cols-2 gap-4 p-4 rounded-md'>
                    <div>
                        <Label>Vendor Name</Label>
                        <Input value={vendorName} name="vendorName" id="vendorName" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Vendor Email</Label>
                        <Input value={vendorEmail} name="vendorEmail" id="vendorEmail" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Password</Label>
                        <Input value={password} type='password' name="password" id="password" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Vendor Address</Label>
                        <Input value={vendorAddress} name="vendorAddress" id="vendorAddress" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Contact Person Name</Label>
                        <Input value={contactPersonName} name="contactPersonName" id="contactPersonName" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Contact Person Mob No.</Label>
                        <Input value={contactPersonMobNo} name="contactPersonMobNo" id="contactPersonMobNo" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Select Batteries</Label>
                        <div className="relative">
                            <button
                                type="button"
                                className="flex justify-between items-center w-full border rounded-md p-2"
                                onClick={() => setShowBatteryDropdown(!showBatteryDropdown)}
                            >
                                <span className="text-gray-700">Select Batteries</span>
                                <Battery className="w-4 h-4 text-gray-700 cursor-pointer" />
                            </button>
                            {showBatteryDropdown && (
                                <div className="absolute w-full z-10 bg-white  dark:bg-black border rounded-md shadow-lg mt-1">
                                    <h1 className='p-2'>Not issued Batteries</h1>

                                    <div className="space-y-2 p-2 overflow-y-scroll">
                                        {batteries.map(battery => (
                                            <div key={battery._id} className="flex border rounded-md p-3 items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={battery._id}
                                                    value={battery._id}
                                                    checked={vendorData.batteriesAssigned.includes(battery._id)}
                                                    onChange={() => handleBatterySelection(battery._id)}
                                                />
                                                <label htmlFor={battery._id}>{battery.serialNo}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button type='submit' className='w-full'>Submit</Button>
                </form>
                <Toaster />
            </div>
        </Layout>
    )
}
