import connectDB from '@/utils/connectDB';
import Battery from '@/models/Battery';
import Booking from '@/models/Booking';
import User from '@/models/userModel';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectDB();

    const { bookingId, newSerialNo } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const user = await User.findOne({ customerId: booking.user });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const battery = await Battery.findOne({ serialNo: newSerialNo });
        if (!battery) {
            return res.status(404).json({ error: 'Battery not found' });
        }

        // Update the user's battery serial number
        user.batterySrNo = newSerialNo;
        await user.save();

        // Update the booking's completed status
        booking.completed = true;
        await booking.save();

        res.status(200).json({ message: 'Battery assigned successfully' });
    } catch (error) {
        console.error('Error assigning battery:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
