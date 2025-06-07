import mailTransport from "./mailTansportConfig.js";
import { FORGOT_PASSWORD_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (to, verificationCode) => {

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: 'verification code',
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationCode
        )
    }

    mailTransport.sendMail(mailOption, (error, info) => {

        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }

    });

}

export const sendForgotPasswordEmail = async (userObj) => {

     const mailOption = {
        from:process.env.GMAIL_USER,
        to: userObj.email,
        subject:'Forget Password',
        html: FORGOT_PASSWORD_EMAIL_TEMPLATE.replaceAll(
            "{RESET_LINK}",
            `$http://localhost:5173/reset-password?token=${userObj._id}`
        )
    }

    mailTransport.sendMail(mailOption, (error, info) => {

        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }

    });

}