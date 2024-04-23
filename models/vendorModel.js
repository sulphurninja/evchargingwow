import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
    },
    vendorEmail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required:true,
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
        type: Number,
        required: true,
    },
});

const Vendor = mongoose.models.vendor || mongoose.model('Vendor', vendorSchema);

export default Vendor;
