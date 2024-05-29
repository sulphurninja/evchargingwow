import mongoose from 'mongoose';

const batterySchema = new mongoose.Schema({
    serialNo: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        default: 'not issued',
        enum: ['not issued', 'user', 'vendor'],
    },
    isFull: {
        type: Boolean,
        default: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    },
    qrCode: {
        type: String,
        required: true,
    },
    fullAt: {
        type: Date,
    },
});

let Dataset = mongoose.models.battery || mongoose.model('battery', batterySchema);
export default Dataset;
