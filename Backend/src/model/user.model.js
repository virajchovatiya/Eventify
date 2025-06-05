import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'organizer'],
        default: 'user',
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;