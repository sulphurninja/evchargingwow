"use client"

import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { UserClient, VendorClient } from '@/components/tables/vendor-tables/client'
import BreadCrumb from '@/components/breadcrumb'
import axios from 'axios'


const breadcrumbItems = [{ title: "Vendors", link: "/dashboard/vendors" }];

export default function Vendors() {
    const [vendorData, setVendorData] = useState([]);

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                const response = await axios.get('/api/getVendors');
                setVendorData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchVendorsData();
    }, []);

    return (
        <Layout>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <VendorClient data={vendorData} />
            </div>
        </Layout>
    )
}
