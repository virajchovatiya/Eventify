import mailTransport from "./mailTansportConfig.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

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