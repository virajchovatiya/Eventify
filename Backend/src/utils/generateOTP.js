export default function generateOTP(length = 6) {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }
    return otp;
}