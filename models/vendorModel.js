import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
    },
    vendorEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    vendorCode: {
        type: String,
        required: true,
        unique: true,
    },
    vendorAddress: {
        type: String,
        required: true,
    },
    contactPersonName: {
        type: String,
        required: true,
    },
    contactPersonMobNo: {
        type: String,
        required: true,
    },
    batteriesAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'battery',
    }],
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
});

let Dataset = mongoose.models.vendor || mongoose.model('vendor', vendorSchema);

export default Dataset;
