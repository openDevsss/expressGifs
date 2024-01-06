import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: "gifsproject@yandex.ru",
    pass: "mfwcdewnyrghrzoj",
  },
});
export default transporter;
