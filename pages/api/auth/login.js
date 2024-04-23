import Users from '../../../models/userModel'
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
        const { email, password } = req.body

        // const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({ err: 'You are not registerd!' })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ err: 'Incorrect Password, Check again!' })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "Login Successful!!",
            refresh_token,
            access_token,
            user: {
                email: user.email,
                role: user.role,
                root: user.root,
                name: user.name,
                customerId: user.customerId,
                vehicleName: user.vehicleName,
                batterySrNo: user.batterySrNo,
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}