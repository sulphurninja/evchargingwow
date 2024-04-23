import BreadCrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import { DataContext } from '@/store/GlobalState';
import { postData } from '@/utils/fetchData';
import { User } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

const breadcrumbItems = [
    { title: "User", link: "/dashboard/users" },
    { title: "Register User", link: "/dashboard/users/register" },
];

export default function Register() {
    const initialState = { password: '', name: '', email: '', mobNo: '', vehicleName: '', batterySrNo: '' }
    const [userData, setUserData] = useState(initialState)
    const { password, name, email, mobNo, vehicleName, batterySrNo } = userData
    const { state, dispatch } = useContext(DataContext)



    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = async e => {
        e.preventDefault()

        const res = await postData('auth/register', userData)
        if (res.msg === 'Successful Registration!') {
            toast('User Registered Successfully! ✅')
            setUserData(initialState); 
            // console.log('JSON files generated successfully.');
        } else {
     
            toast(res.err);
            setUserData(initialState); 

        }
    }

    return (
        <Layout>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <Heading
                    title={`Register a Customer 👤`}
                    description="Enter the following details to register a customer"
                />
                <form onSubmit={handleSubmit} className='border grid md:grid-cols-2 gap-4 p-4 rounded-md'>
                    <div>
                        <Label>Customer Name</Label>
                        <Input value={name} name="name" id="name" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Email</Label>
                        <Input value={email} name="email" id="email" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Password</Label>
                        <Input value={password} type='password' name="password" id="password" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Mob No.</Label>
                        <Input value={mobNo} name="mobNo" id="mobNo" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Vehicle Name</Label>
                        <Input value={vehicleName} name="vehicleName" id="vehicleName" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <div className=''>
                        <Label>Battery Sr No</Label>
                        <Input value={batterySrNo} name="batterySrNo" id="batterySrNo" className='rounded-md' onChange={handleChangeInput} />
                    </div>
                    <Button type='submit' className='w-full'>Submit</Button>
                </form>
                <Toaster />
            </div>
        </Layout>
    )
}
