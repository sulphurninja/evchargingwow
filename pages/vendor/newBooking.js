import BreadCrumbVendor from '@/components/breadcrumbVendor'
import LayoutVendor from '@/components/layoutVendor'
import OtpTest from '@/components/otp-input'
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

const breadcrumbItems = [
    { title: "New Booking", link: "/vendor/newBooking" },
];

export default function NewBooking() {
    const { state = {}, dispatch } = useContext(DataContext);
    const { auth = {} } = state;
    const [vendorCode, setVendorCode] = useState("");

    useEffect(() => {
        const vendor = auth.vendor;
        if (vendor) {
            setVendorCode(vendor.vendorCode);
            localStorage.setItem('vendorName', vendor.vendorName);

        }
    }, [auth.vendor])
    return (
        <LayoutVendor>
            {/* <HeaderVendor /> */}
            <div className='p-4'>
                <BreadCrumbVendor items={breadcrumbItems} />

                <div className='mt-12 flex justify-center'>
                    <OtpTest vendorCode={vendorCode} />
                </div>
            </div>
        </LayoutVendor>
    )
}
