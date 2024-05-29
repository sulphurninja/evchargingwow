import connectDb from '../../../utils/connectDB'; // Adjust the import path if needed
import Booking from '../../../models/Booking'; // Adjust the import path if needed

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDb();

  const { id } = req.query;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
