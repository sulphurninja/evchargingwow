"use client"
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "@/store/GlobalState";
import HeaderVendor from "@/components/headerVendor";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function page() {

    const { state = {}, dispatch } = useContext(DataContext);
    const { auth = {} } = state;
    const [vendorName, setVendorName] = useState("");
    const [batteryData, setBatteryData] = useState([]);
    const [assignedbatteryData, setAssignedbatterydata] = useState([]);
    const [vendorCode, setVendorCode] = useState('');
    const [batteryStatuses, setBatteryStatuses] = useState(
        assignedbatteryData.reduce((acc, battery) => {
            acc[battery.serialNo] = battery.isFull;
            return acc;
        }, {})
    );

    const handleToggle = async (serialNo) => {
        const newStatus = !batteryStatuses[serialNo];
        setBatteryStatuses((prevStatuses) => ({
            ...prevStatuses,
            [serialNo]: newStatus,
        }));

        try {
            await axios.post('/api/updateBatteryStatus', {
                serialNo,
                isFull: newStatus,
            });
        } catch (error) {
            console.error('Error updating battery status:', error);
        }
    };



    // console.log(auth.vendor.vendorCode, 'vendor')

    useEffect(() => {
        setVendorCode(auth?.vendor?.vendorCode);
        localStorage.setItem('vendorCode', auth?.vendor?.vendorCode);

    }, [auth.vendor]);

    useEffect(() => {
        const fetchAssignedBattery = async () => {
            try {
                const response = await axios.get(`/api/getAssignedBatteries?vendorCode=${vendorCode}`);
                setAssignedbatterydata(response.data);
            } catch (error) {
                console.error('Error fetching battery data:', error);
            }
        };
        fetchAssignedBattery();
    }, [vendorCode]);

    console.log(batteryData, 'battery')
    console.log(auth.vendor, 'vendor (loggedin)');

    useEffect(() => {
        const vendor = auth.vendor;
        if (vendor) {
            setVendorName(vendor.vendorName);
            localStorage.setItem('vendorName', vendor.vendorName);

        }
    }, [auth.vendor])

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
    const availableBatteries = batteryData.filter(battery => battery.isFull).length; // Calculate charging batteries

    return (
        <>
            <HeaderVendor />
            <div className="flex-1 h-full mt-12 overflow-y-scroll space-y-4 p-4 md:p-8 pt-6">

                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Welcome {vendorName}👋
                    </h2>

                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" >
                            Battery Charging
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Batteries
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold"></div>
                                    <p className="text-xs text-muted-foreground">
                                        No. of Registered Batteries
                                    </p>
                                </CardContent>
                            </Card> */}
                            <Link href='/vendor/newBooking'>
                                <Card className='hover:shadow-sm hover:shadow-white'>
                                    <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            New Booking
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"></div>
                                        <p className="text-xs text-muted-foreground">
                                            New Customer Booking
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href='/vendor/availablestock'>
                                <Card className='hover:shadow-sm hover:shadow-white'>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Available Stock
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"></div>
                                        <p className="text-xs text-muted-foreground">
                                            Currently Full Batteries
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href='/vendor/totalStock'>
                                <Card className='hover:shadow-sm hover:shadow-white'>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Stock
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"></div>
                                        <p className="text-xs text-muted-foreground">
                                            Currently Full Batteries
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                        {assignedbatteryData.map((hmm) => (
                            <Card className='hover:shadow-sm hover:shadow-white'>
                                <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {hmm.serialNo}
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold"></div>
                                    {hmm.status}
                                    <div className="flex gap-2 mt-2">
                                    <h1>is Full</h1>
                                        <Switch
                                            checked={batteryStatuses[hmm.serialNo]}
                                            onCheckedChange={() => handleToggle(hmm.serialNo)}
                                            className={`${batteryStatuses[hmm.serialNo] ? 'bg-green-400' : 'bg-gray-200'
                                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
