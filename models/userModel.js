import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    name: {
        type: String,
        required: true
    },
    mobNo: {
        type: Number,
        required: true,
    },
    root: {
        type: Boolean,
        default: false
    },
    vehicleName: {
        type: String,
    },
    batterySrNo: {
        type: Number,
        required: true,
    },
    customerId: {
        type: String,
    },
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset
