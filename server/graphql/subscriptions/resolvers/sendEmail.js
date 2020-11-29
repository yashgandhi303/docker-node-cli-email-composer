import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST || "localhost";
const port = process.env.MAIL_PORT || 1025;
const userName = process.env.MAIL_USER_NAME || "";
const password = process.env.MAIL_PASSWORD || "";

const sendEmail = async (email) => {
  const senderTransport = nodemailer.createTransport({
    host: mailHost,
    port: port,
    auth: {
      user: userName,
      pass: password,
    },
  });
  const message = {
    from: "info@digsup.com",
    to: email,
    subject: "DigsUp Subscription 2020",
    text: "New subscription from Digsup - 2020 Special Edition",
    html:
      "<p>Email Services from Disgsup 2020 Special Edition, Try out now!</p>",
  };
  return senderTransport.sendMail(message);
};

module.exports = { sendEmail };
