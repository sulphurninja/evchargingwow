"use client"

import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { BatteryClient } from '@/components/tables/battery-tables/client'
import BreadCrumb from '@/components/breadcrumb'
import axios from 'axios'


const breadcrumbItems = [{ title: "Batteries", link: "/dashboard/batteries" }];

export default function Batteries() {
  const [batteryData, setBatteryData] = useState([]);

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

  console.log(batteryData, 'battery data')

  return (
    <Layout>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <BatteryClient data={batteryData} />
      </div>
    </Layout>
  )
}
