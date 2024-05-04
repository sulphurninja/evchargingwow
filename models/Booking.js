import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    bookingOTP: {
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

let Dataset = mongoose.models.booking || mongoose.model('booking', bookingSchema)
export default Dataset
