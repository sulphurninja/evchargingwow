// pages/api/getBatteries.js

import connectDB from '@/utils/connectDB';
import Battery from '@/models/Battery'; // Import your Battery model
import Vendor from '@/models/vendorModel'; // Import your Vendor model

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { vendorCode } = req.query;

    if (!vendorCode) {
        return res.status(400).json({ error: 'Vendor code is required' });
    }

    try {
        await connectDB(); // Connect to your MongoDB database

        // Find the vendor by their vendorCode
        const vendor = await Vendor.findOne({ vendorCode });

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Find full batteries assigned to the vendor
        const batteries = await Battery.find({ _id: { $in: vendor.batteriesAssigned }, isFull: true });

        // Return the fetched batteries as a JSON response
        res.status(200).json(batteries);
    } catch (error) {
        console.error('Error fetching batteries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
