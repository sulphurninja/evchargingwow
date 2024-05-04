"use client"
import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { UserClient } from '@/components/tables/user-tables/client'
import BreadCrumb from '@/components/breadcrumb'
import axios from 'axios'


const breadcrumbItems = [{ title: "User", link: "/dashboard/users" }];

export default function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('/api/getUsers');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsersData();
  }, []);

  return (
    <Layout>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={userData} />
      </div>
    </Layout>
  )
}
