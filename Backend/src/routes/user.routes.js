import { Router } from 'express';
import {
    getUserProfile,
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

userRouter.get('/logout', verifyJWT, userLogout)
userRouter.get('/profile', verifyJWT, getUserProfile);

export default userRouter;