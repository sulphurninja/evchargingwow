import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="flex h-screen overflow-y-scroll">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}
