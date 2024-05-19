import Sidebar from '@/components/sidebar'
import React from 'react'
import HeaderVendor from './headerVendor'

export default function LayoutVendor({ children }) {
    return (
        <>
            <HeaderVendor />
            <div className="flex h-screen overflow-y-scroll">
                {/* <Sidebar /> */}
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}
