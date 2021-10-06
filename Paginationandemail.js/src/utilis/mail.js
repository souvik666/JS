/* create endpoint for registering where in the user can register and when he registers we should send him a confirmation email and the contents of that will be */

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ethereal_username,
      pass: process.env.ethereal_password,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.ethereal_email,
    to: user.email,
    subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
    text: ` Hi ${user.first_name}, Please confirm your email address`,
    html: "",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
