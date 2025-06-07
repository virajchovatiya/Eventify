import User from '../model/user.model.js';
import { sendForgotPasswordEmail, sendVerificationEmail } from '../email/sendMail.js';
import generateOTP from '../utils/generateOTP.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiRespones.js';
import { z } from 'zod';
import OTP from '../model/otp.model.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;

const userSignupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
        .regex(passwordRegex, {
            message:
                "Password must contain uppercase, lowercase, number, and special character",
        }),
    role: z.enum(['user', 'admin', 'organizer']).optional(),
});

const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters long" })
    .regex(passwordRegex, {
        message:
            "Password must contain uppercase, lowercase, number, and special character",
    });

const userRegister = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;

    const parsedData = userSignupSchema.safeParse({ name, email, password, role });

    if (!parsedData.success) {
        throw new ApiError(400, "Validation Error");
    }

    const isUserExists = await User.findOne({
        email: email
    });

    if (isUserExists) {
        throw new ApiError(400, "User already exists with this email");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something wrong while registering user");
    }

    const otp = generateOTP();

    const otpObj = await OTP.create({
        userId: user._id,
        otpNumber: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
    });

    if (!otpObj) {
        throw new ApiError(500, "Something wrong while generating OTP");
    }

    sendVerificationEmail(createdUser.email, otp);

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
                otp: otpObj.otpNumber,
            },
            "User registered successfully."
        )
    );

});

const verifyOTP = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otpRecord = await OTP.findOne({
        userId: user._id
    });

    if (!otpRecord) {
        throw new ApiError(404, "OTP not found for this user");
    }

    if (new Date(Date.now()) > otpRecord.expiresAt) {
        throw new ApiError(400, "OTP has expired");
    }

    if (otpRecord.otpNumber !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    await User.findByIdAndUpdate(user._id, { isVerified: true }, { new: true });
    await OTP.findByIdAndDelete(otpRecord._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "User email verified successfully."
        )
    );

});

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified === false) {
        return res.status(403).json(
            new ApiResponse(
                403,
                null,
                "User email is not verified. Please verify your email to login."
            )
        );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { refreshToken: refreshToken },
        { new: true }
    ).select("-password");

    const options = {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: updatedUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully."
            )
        );

});

const userLogout = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    await User.findByIdAndUpdate(userId, { refreshToken: null });

    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(
                200,
                null,
                "User logged out successfully."
            )
        );

});

const getUserProfile = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User profile fetched successfully."
        )
    );

});

const resendOTP = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const user = await User.find({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otp = generateOTP();

    const otpObj = await OTP.findOneAndUpdate(
        {
            userId: user._id
        },
        {
            otpNumber: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        },
        {
            new: true
        }
    );

    if (!otpObj) {
        throw new ApiError(500, "Something wrong while generating OTP");
    }

    sendVerificationEmail(user.email, otp);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                otp: otpObj.otpNumber,
            },
            "OTP resent successfully."
        )
    );

});

const handleForgotPasswordRequest = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const user = await User.find({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    sendForgotPasswordEmail(user);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Forgot password email sent successfully."
        )
    );

});

const forgotPassword = asyncHandler(async (req, res) => {

    const { userId, newPassword, confirmPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const parsedPassword = passwordSchema.safeParse(newPassword);

    if (!parsedPassword.success) {
        throw new ApiError(400, parsedPassword.error.errors[0].message);
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password updated successfully."
        )
    );

});

const changePassword = asyncHandler(async (req, res) => {  

    const {oldPassword, newPassword, confirmPassword} = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(401, "Unauthorized access");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid old password");
    }

    const parsedPassword = passwordSchema.safeParse(newPassword);

    if (!parsedPassword.success) {
        throw new ApiError(400, parsedPassword.error.errors[0].message);
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password changed successfully."
        )
    );

});

export {
    userRegister,
    verifyOTP,
    userLogin,
    userLogout,
    getUserProfile,
    resendOTP,
    forgotPassword,
    handleForgotPasswordRequest,
    changePassword
};