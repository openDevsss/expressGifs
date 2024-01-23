import { RequestHandler } from "express";
import dotenv from "dotenv";
import { generateCodeEmail } from "../mailer/generateCode";
import { VerificationCode } from "../models/VerificationCode";
import createTransporter from "../mailer/mailer";

dotenv.config();
console.log(process.env.EMAIL_LOGIN);

async function sendVerificationCode(email: string, code: string) {
  const transporter = await createTransporter(); // Используем функцию createTransporter для получения транспортера

  const mailOptions = {
    from: process.env.EMAIL_LOGIN,
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
}
export const getEmailCode: RequestHandler = async (req, res) => {
  const { id: userId } = req.user;
  const verificationCode = generateCodeEmail();

  await VerificationCode.create({
    code: verificationCode,
    userId,
  });

  await sendVerificationCode("zak2613s@yandex.ru", verificationCode);

  return res.json({ message: "Verification code sent!" });
};
