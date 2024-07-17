// pages/api/getBookings.js

import connectDB from '@/utils/connectDB';
import Booking from '@/models/Booking';

export default async function handler(req, res) {
  try {
    await connectDB();

    // Extract user ID or vendor ID from query parameters
    const { userId, vendorId } = req.query;

    if (!userId && !vendorId) {
      // Return an error if neither userId nor vendorId is provided
      return res.status(400).json({ error: 'User ID or Vendor ID is required' });
    }

    let bookings;

    if (userId) {
      // If user ID is provided, fetch bookings for that user
      bookings = await Booking.find({ user: userId });
    } else if (vendorId) {
      // If vendor ID is provided, fetch bookings for that vendor
      bookings = await Booking.find({ vendor: vendorId });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
