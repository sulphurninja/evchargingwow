// pages/api/verify-otp.js
import connectDb from '../../utils/connectDB'; // Assuming you have a connectDb utility
import Booking from '../../models/Booking'; // Adjust the import path if needed

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectDb();

    const { otp, vendorCode } = req.body;

    try {
        const booking = await Booking.findOne({ bookingOTP: otp });

        if (!booking) {
            return res.status(404).json({ error: 'OTP not found' });
        }

        // Check if booking is already completed
        if (booking.completed) {
            return res.status(400).json({ error: 'Booking is already complete' });
        }

        booking.vendor = vendorCode;
        await booking.save();

        res.status(200).json({ message: 'OTP verified and vendor updated successfully', bookingId: booking._id });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
