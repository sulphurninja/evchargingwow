import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const breadcrumbItems = [
    { title: "Batteries", link: "/dashboard/batteries" },
    { title: "Register", link: "/dashboard/batteries/register" },
];

export default function RegisterBattery() {
    const [manufacturer, setManufacturer] = useState('');
    const [batteryType, setBatteryType] = useState('');

    const addBattery = async () => {
        try {
            const response = await axios.post('/api/addBattery', {
                manufacturer,
                type: batteryType
            });
            console.log('Battery added successfully:', response.data);
            toast('Battery registered successfully! 🔋');
            setManufacturer('');
            setBatteryType('');
        } catch (error) {
            console.error('Error adding battery:', error);
        }
    };

    return (
        <Layout>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <Heading
                    title={`Register a Battery 🔋`}
                    description="Enter the following details to register a battery"
                />
                <div className='border p-4 rounded-lg'>
                    <div className=''>
                        <Label>Manufacturer</Label>
                        <Input
                            placeholder='Enter the manufacturer'
                            className='rounded-md p-2'
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label>Battery Type</Label>
                        <Input
                            placeholder='Enter the battery type'
                            className='rounded-md p-2'
                            value={batteryType}
                            onChange={(e) => setBatteryType(e.target.value)}
                        />
                    </div>
                    <Button className='mt-4' onClick={addBattery}>Register a Battery</Button>
                </div>
            </div>
            <Toaster />
        </Layout>
    );
}
