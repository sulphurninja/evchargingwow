import Vendors from '../../../models/vendorModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'
import connectDb from "../../../utils/connectDB";

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        const { vendorEmail, password, latitude, longitude } = req.body

        const vendor = await Vendors.findOne({ vendorEmail })
        if (!vendor) return res.status(400).json({ err: 'You are not registered!' })

        const isMatch = await bcrypt.compare(password, vendor.password)
        if (!isMatch) return res.status(400).json({ err: 'Incorrect Password, Check again!' })

        // Update latitude and longitude if provided
        if (latitude !== undefined && longitude !== undefined) {
            vendor.latitude = latitude;
            vendor.longitude = longitude;
            await vendor.save();
        }

        const access_token = createAccessToken({ id: vendor._id })
        const refresh_token = createRefreshToken({ id: vendor._id })

        res.json({
            msg: "Login Successful!!",
            refresh_token,
            access_token,
            vendor: {
                vendorEmail: vendor.vendorEmail,
                vendorName: vendor.vendorName,
                vendorCode: vendor.vendorCode,
                vendorAddress: vendor.vendorAddress,
                contactPersonName: vendor.contactPersonName,
                contactPersonMobNo: vendor.contactPersonMobNo,
                batteriesAssigned: vendor.batteriesAssigned,
                latitude: vendor.latitude,
                longitude: vendor.longitude,
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
