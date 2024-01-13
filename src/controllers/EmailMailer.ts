import { RequestHandler } from "express";
import transporter from "../mailer/mailer";
import { generateCodeEmail } from "../mailer/generateCode";
import { VerificationCode } from "../models/VerificationCode";

async function sendVerificationCode(email: string, code: string) {
  const mailOptions = {
    from: process.env.EMAIL_LOGIN,
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification code sent successfully.");
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
}

export const getEmailCode: RequestHandler = async (req, res, next) => {
  try {
    const { id: userId, email } = req.user;
    const verificationCode = generateCodeEmail();

    // Save the code to the database or cache, associating it with the user
    await VerificationCode.create({
      code: verificationCode,
      userId,
    });

    // Send the code to the email
    await sendVerificationCode(email, verificationCode);

    return res.json({ message: "Verification code sent!" });
  } catch (error) {
    return next;
  }
};
