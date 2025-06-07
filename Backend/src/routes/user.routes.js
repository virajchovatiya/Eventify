import { Router } from 'express';
import {
    changePassword,
    forgotPassword,
    getUserProfile,
    handleForgotPasswordRequest,
    resendOTP,
    userLogin,
    userLogout,
    userRegister,
    verifyOTP
} from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.post('/signup', userRegister)
userRouter.post('/login', userLogin)

userRouter.post('/verify-otp', verifyOTP)
userRouter.post('/resend-otp', resendOTP)

userRouter.post('/forgot-password-request', handleForgotPasswordRequest)
userRouter.post('/forgot-password', forgotPassword)

userRouter.post('/change-password', verifyJWT, changePassword)
userRouter.get('/logout', verifyJWT, userLogout)
userRouter.get('/profile', verifyJWT, getUserProfile);

export default userRouter;