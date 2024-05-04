// pages/api/getBatteries.js

import connectDB from '@/utils/connectDB';
import Vendors from '@/models/vendorModel'; // Import your Battery model

export default async function handler(req, res) {
  try {
    await connectDB(); // Connect to your MongoDB database

    // Fetch all batteries from the database
    const vendors = await Vendors.find({});

    // Return the fetched batteries as a JSON response
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
