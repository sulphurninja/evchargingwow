import connectDb from '../../utils/connectDB';
import Battery from '../../models/Battery';
import Vendor from '../../models/vendorModel'; // Assuming you have a Vendor model

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectDb();

    try {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Find batteries that should be full now and became full within the last 24 hours
        const batteries = await Battery.find({
            isFull: false,
            fullAt: { $lte: now, $gte: oneDayAgo }
        });

        for (const battery of batteries) {
            battery.isFull = true;
            battery.fullAt = null; // Reset fullAt field
            await battery.save();

            console.log(`Notification: Battery ${battery.serialNo} is now full and available for use.`);
            res.status(200).json({ data: "Battery ${battery.serialNo} is now full and available for use." });
            // Implement your notification logic here
        }

        res.status(200).json({ message: 'Battery statuses updated successfully' });
    } catch (error) {
        console.error('Error updating battery statuses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
