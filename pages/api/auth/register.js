import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import connectDb from "../../../utils/connectDB";
import Batteries from '../../../models/Battery'

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

// Function to generate sequential customer ID
const generateCustomerId = async () => {
    try {
        // Find the count of existing customers
        const count = await Users.countDocuments({});
        // Generate a sequential ID
        const customerId = `CUST${(count + 1).toString().padStart(4, '0')}`;
        return customerId;
    } catch (error) {
        console.error('Error generating customer ID:', error);
        throw error; // Throw error for handling in the caller function
    }
}

const register = async (req, res) => {
    try {
        const { email, password, role, name, mobNo, vehicleName, batterySrNo } = req.body;

        const passwordHash = await bcrypt.hash(password, 12);
        // Check if the provided batterySrNo exists in the batteries collection
        const battery = await Batteries.findOne({ serialNo: batterySrNo });
        console.log(battery)
        if (!battery) {
            return res.status(400).json({ err: 'Invalid battery serial number!' });
        }

        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ err: 'You are already registered!' });
        }

        const newUser = new Users({
            email,
            password: passwordHash,
            role,
            name,
            mobNo,
            vehicleName,
            customerId: await generateCustomerId(), // Generate customer id for the new user
            batterySrNo,
        });

        await newUser.save();

        res.json({ msg: "Successful Registration!" });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

