import QRCode from 'qrcode';
import Battery from '../../models/Battery';
import connectDb from '@/utils/connectDB';


export default async function handler(req, res) {
    await connectDb();
    if (req.method === 'POST') {
        try {
            // Generate auto-incremented serial number
            const serialNo = await generateSerialNo();

            // Generate QR code for the serial number
            const qrCode = await generateQRCode(serialNo);

            // Create a new battery document
            const newBattery = new Battery({
                serialNo,
                manufacturer: req.body.manufacturer,
                type: req.body.type,
                qrCode
            });

            // Save the battery document to the database
            await newBattery.save();

            res.status(201).json({ success: true, message: 'Battery added successfully' });
        } catch (error) {
            console.error('Error creating battery:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }
}

async function generateSerialNo() {
    // Get current financial year and month
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    // Determine the current financial year and end year
    const financialYearStartMonth = 4; // Assuming financial year starts in April
    const financialYear = currentMonth < financialYearStartMonth ? currentYear - 1 : currentYear;
    const financialYearEnd = financialYear + 1;

    // Format year range for serial number
    const yearRange = `${financialYear}${financialYearEnd.toString().slice(-2)}`;

    // Format month with leading zero if needed
    const month = currentMonth.toString().padStart(2, '0');

    // Find the latest serial number for the current financial year and month
    const latestBattery = await Battery.findOne({ serialNo: { $regex: `^${yearRange}${month}` } })
        .sort({ serialNo: -1 })
        .limit(1);

    let serialNo;
    if (latestBattery) {
        // Get the current serial number's sequence number
        const lastSerialNo = parseInt(latestBattery.serialNo.slice(-3));

        // If the month has changed, reset the sequence number to 1
        serialNo = `${yearRange}${month}${(lastSerialNo + 1).toString().padStart(3, '0')}`;
    } else {
        // Start with 001 if no previous battery exists for the current month
        serialNo = `${yearRange}${month}001`;
    }

    return serialNo;
}


async function generateQRCode(serialNo) {
    try {
        // Generate QR code containing the serial number
        const qrCode = await QRCode.toDataURL(serialNo);
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
}