// pages/api/getBatteries.js

import connectDB from '@/utils/connectDB';
import Battery from '@/models/Battery'; // Import your Battery model

export default async function handler(req, res) {
  try {
    await connectDB(); // Connect to your MongoDB database

    // Fetch all batteries from the database
    const batteries = await Battery.find({status: 'not issued'});

    // Return the fetched batteries as a JSON response
    res.status(200).json(batteries);
  } catch (error) {
    console.error('Error fetching batteries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
