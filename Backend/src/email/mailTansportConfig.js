import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailTransport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,              // Set to true if using port 465 (SSL)
    auth: {
        user: process.env.GMAIL_USER,     // Your Gmail email
        pass: process.env.GMAIL_PASSWORD  // Your Gmail password or app-specific password
    },
});

export default mailTransport;