import connectDb from '../../utils/connectDB';
import Battery from '../../models/Battery';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDb();

  const { serialNo } = req.body;

  try {
    const battery = await Battery.findOne({ serialNo });

    if (!battery) {
      return res.status(404).json({ error: 'Battery not found' });
    }

    battery.status = 'vendor';
    battery.isFull = false;
    battery.fullAt = new Date(Date.now() + 9 * 60 * 60 * 1000); // 9 hours from now
    await battery.save();

    res.status(200).json({ message: 'Battery status updated successfully' });
  } catch (error) {
    console.error('Error updating battery status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
