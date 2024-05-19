import Booking from '../../models/Booking';
import connectDb from '@/utils/connectDB';

const generateOTP = () => {
    // Generate a random 5-digit OTP
    return Math.floor(10000 + Math.random() * 90000);
};

export default async function handler(req, res) {
    await connectDb();
    if (req.method === 'POST') {
        try {
            const { userId, vendorId } = req.body;

            // Generate a new booking OTP
            const bookingOTP = generateOTP();

            // Create a new booking instance
            const newBooking = new Booking({
                bookingOTP,
                user: userId,
                vendor: vendorId
            });

            // Save the booking to the database
            await newBooking.save();

            res.status(201).json({ message: 'Booking created successfully', bookingOTP });
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
