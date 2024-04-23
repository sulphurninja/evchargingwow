import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}
