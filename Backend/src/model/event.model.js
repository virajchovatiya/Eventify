import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    organizerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalTickets: {
        type: Number,
        required: true,
    },
    ticketsSold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true,
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;