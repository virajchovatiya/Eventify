import mongoose, { Schema } from 'mongoose'

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otpNumber: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
