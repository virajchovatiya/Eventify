import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new ApiError(401, 'Unauthorized access, no AccessToken provided');
    }

    try {

        const decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_JWTSECRET);

        const user = await User.findById(decodedToken._id).select('-password -refreshToken');

        if (!user) {
            throw new ApiError(404, 'Invalid AccessToken, user not found');
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, 'Unauthorized access, invalid AccessToken');
    }

})
