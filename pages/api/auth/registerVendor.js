import Vendors from '../../../models/vendorModel';
import bcrypt from 'bcrypt';
import connectDb from "../../../utils/connectDB";

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const generateVendorCode = async () => {
    try {
        // Find the count of existing vendors
        const count = await Vendors.countDocuments({});
        // Generate a sequential vendor code
        const vendorCode = `VEND${(count + 1).toString().padStart(4, '0')}`;
        return vendorCode;
    } catch (error) {
        console.error('Error generating vendor code:', error);
        throw error; // Throw error for handling in the caller function
    }
}

const register = async (req, res) => {
    try {
        const { vendorName, vendorEmail, password, vendorAddress, contactPersonName, contactPersonMobNo, batteriesAssigned, latitude, longitude } = req.body;

        // Check if the vendor email is already registered
        const existingVendor = await Vendors.findOne({ vendorEmail });
        if (existingVendor) {
            return res.status(400).json({ error: 'Vendor email already exists' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create a new vendor instance
        const newVendor = new Vendors({
            vendorName,
            vendorCode: await generateVendorCode(),
            password: passwordHash,
            vendorEmail,
            vendorAddress,
            contactPersonName,
            contactPersonMobNo,
            batteriesAssigned, // Assign batteries to the vendor
        });

        // Save the new vendor to the database
        await newVendor.save();

        res.json({ msg: "Vendor registration successful!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

