import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    qrCodeUrl: {
        type: String,
        required: false,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'failed'],
        required: true,
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;