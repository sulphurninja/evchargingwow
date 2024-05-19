import BreadCrumbVendor from '@/components/breadcrumbVendor'
import LayoutVendor from '@/components/layoutVendor'
import OtpTest from '@/components/otp-input'
import React from 'react'

const breadcrumbItems = [
    { title: "New Booking", link: "/vendor/newBooking" },
];

export default function NewBooking() {
    return (
        <LayoutVendor>
            {/* <HeaderVendor /> */}
            <div className='p-4'>
                <BreadCrumbVendor items={breadcrumbItems} />

                <div className='mt-12 flex justify-center'>
                    <OtpTest />

                </div>
            </div>
        </LayoutVendor>
    )
}
