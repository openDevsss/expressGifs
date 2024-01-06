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
  const { id: userId, email } = req.user;
  const verificationCode = generateCodeEmail();

  // Сохраните код в базе данных или в кеше, связав его с пользователем
  await VerificationCode.create({
    code: verificationCode,
    userId,
  });
  // Отправьте код на почту
  await sendVerificationCode(email, verificationCode);

  return res.json({ message: "Verification code sent!" });
};
