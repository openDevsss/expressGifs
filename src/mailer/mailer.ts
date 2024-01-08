import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  service: "Yandex",
  port: 465,
  secure: true,
  auth: {
    user: "gifsproject@yandex.ru",
    pass: "openDevsssfcngrant",
    accessToken: "mfwcdewnyrghrzoj",
  },
});
export default transporter;
