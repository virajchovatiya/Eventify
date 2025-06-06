import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role
        },
        process.env.ACCESSTOKEN_JWTSECRET,
        {
            expiresIn: process.env.ACCESSTOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESHTOKEN_JWTSECRET,
        {
            expiresIn: process.env.REFRESHTOKEN_EXPIRY
        }
    )
}

const User = mongoose.model('User', userSchema);
export default User;