"use client"

import LayoutVendor from '@/components/layoutVendor';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { AvatarIcon } from '@radix-ui/react-icons';
import { QrCode, QrCodeIcon, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const BookingPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState(null);
    const [userDetails, setUserDetails] = useState();
    const [serialNo, setSerialNo] = useState('');
    const [newSerialNo, setNewSerialNo] = useState('');

    const handleUpdateBattery = async () => {
        try {
            const response = await fetch('/api/update-battery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ serialNo })
            });

            if (response.ok) {
                console.log('Battery status updated successfully');
                toast.success("Battery Status updated successfully!")
                // Redirect or update UI as needed
            } else {
                console.error('Failed to update battery status');
            }
        } catch (error) {
            console.error('Error updating battery status:', error);
        }
    };

    const handleNewBattery = async () => {
        try {
            const response = await fetch('/api/assign-battery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookingId: id, newSerialNo })
            });

            if (response.ok) {
                console.log('Battery assigned successfully');
                toast.success("Battery assigned successfully!");
                router.push('/vendor/dashboard'); // Redirect to the thanks page
            } else {
                console.error('Failed to assign battery');
            }
        } catch (error) {
            console.error('Error assigning battery:', error);
        }
    };



    useEffect(() => {
        if (id) {
            fetch(`/api/bookings/${id}`)
                .then(response => response.json())
                .then(data => setBooking(data.booking))
                .catch(error => console.error('Error fetching booking:', error));
        }
    }, [id]);
    useEffect(() => {
        if (booking) {
            fetch(`/api/getUsersById?customerId=${booking.user}`)
                .then(response => response.json())
                .then(data => setUserDetails(data))
                .catch(error => console.error('Error fetching user details:', error));
        }
    }, [id]);



    if (!booking) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Toaster />
            <LayoutVendor >
                <div className='p-4 md:flex md:gap-4 md:space-y-0 space-y-4'>
                    <Card className='md:w-[35%]'>
                        <CardHeader>Booking Details</CardHeader>
                        <CardDescription >
                            <div className='p-4'>
                                <p>Booking ID: {booking._id}</p>
                                <p>Customer Code: <strong>{booking.user}</strong></p>
                                <p>Vendor Code: <strong>{booking.vendor}</strong></p>
                                <p>Completed: <strong>
                                    {booking.completed ? 'Yes' : 'No'}
                                </strong></p>
                            </div>
                            <Separator />
                            <div className='mt-4 p-4'>
                                <Avatar className=' ' ><div className=''><User /></div></Avatar>

                                <h1 className='text-lg font-bold'>User Details</h1>
                                {userDetails?.map((details) => (
                                    <div>
                                        <h1 className=''>Name: <strong>{details.name}</strong></h1>
                                        <h1>Email: <strong>{details.email}</strong></h1>

                                        <h1>Customer Id: <strong>{details.customerId}</strong></h1>
                                        <h1>Vehicle: <strong>{details.vehicleName}</strong></h1>
                                    </div>
                                ))}
                            </div>
                        </CardDescription>
                    </Card>
                    <Card className='overflow-hidden w-full'>
                        <CardHeader className='text- font-bold text-lg'>Scan QR Code</CardHeader>
                        <CardDescription >
                            <div className='flex justify-center  overflow-hidden'>
                                <div className='p-4 scale-150 flex justify-center'>
                                    <QrCodeIcon className='scale-150 flex justify-center' />

                                    <div>

                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>

                                <Button className='scale-[80%]'>Scan Battery QR Code</Button>
                            </div>

                            <h1 className='text-center font-bold text-xl mb-4 mt-4'>OR</h1>
                            <div className='p-4 md:flex justify-center md:space-y-0 space-y-4 gap-2'>
                                <Input value={serialNo}
                                    onChange={(e) => setSerialNo(e.target.value)}
                                    placeholder="Type your Battery Serial No"
                                />
                                <Button onClick={handleUpdateBattery}>Update Battery Status</Button>

                            </div>


                        </CardDescription>
                        <div className='p-4'>
                            <h1>Assign New Battery</h1>
                            <Card className='overflow-hidden flex p-4 g w-full'>

                                <CardDescription >
                                    <div className='flex justify-center gap-4  overflow-hidden'>
                                        <div className='p-4 scale-150 flex justify-center'>
                                            <QrCodeIcon className='scale-150 mt-4 md:mt-1 flex justify-center' />

                                            <div>

                                            </div>

                                        </div>
                                        <h1 className='text-center font-bold text-xl mb-4 mt-4'>OR</h1>
                                        <div className='p-4 md:flex justify-center md:space-y-0  space-y-4 gap-2'>
                                            <Input value={newSerialNo}
                                                onChange={(e) => setNewSerialNo(e.target.value)}
                                                placeholder="Type New Battery Serial No"
                                            />
                                            <Button onClick={handleNewBattery} >Assign New Battery</Button>

                                        </div>
                                    </div>
                                    <div className='flex justify-center mt-4'>

                                        {/* <Button className='scale-[80%]'>Scan Battery QR Code</Button> */}
                                    </div>




                                </CardDescription>
                            </Card>
                        </div>
                    </Card>

                </div>

            </LayoutVendor>
        </>
    );
};

export default BookingPage;
