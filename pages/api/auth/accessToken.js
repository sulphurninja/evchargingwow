import connectDb from "../../../utils/connectDB";
import Users from '../../../models/userModel';
import Vendors from '../../../models/vendorModel';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../../utils/generateToken';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ err: 'Login Now!' });

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
        if (!result) return res.status(400).json({ err: 'Incorrect token or it has expired!!' });

        let userOrVendor;

        // Check if the token corresponds to a user
        userOrVendor = await Users.findById(result.id);

        // If the token doesn't correspond to a user, check if it corresponds to a vendor
        if (!userOrVendor) {
            userOrVendor = await Vendors.findById(result.id);
        }

        // If neither user nor vendor is found, return an error
        if (!userOrVendor) return res.status(400).json({ err: 'User or vendor does not exist!' });

        // Generate an access token
        const access_token = createAccessToken({ id: userOrVendor._id });

        // Return the access token along with user or vendor information in the response
        res.json({
            access_token,
            userOrVendor: {
                ...(userOrVendor instanceof Users ? {
                    email: userOrVendor.email,
                    role: userOrVendor.role,
                    root: userOrVendor.root,
                    name: userOrVendor.name,
                    customerId: userOrVendor.customerId,
                    vehicleName: userOrVendor.vehicleName,
                    batterySrNo: userOrVendor.batterySrNo,
                } : {
                    vendorName: userOrVendor.vendorName,
                    vendorEmail: userOrVendor.vendorEmail,
                    vendorCode: userOrVendor.vendorCode,
                    vendorAddress: userOrVendor.vendorAddress,
                    contactPersonName: userOrVendor.contactPersonName,
                    contactPersonMobNo: userOrVendor.contactPersonMobNo,
                })
            }
        });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
