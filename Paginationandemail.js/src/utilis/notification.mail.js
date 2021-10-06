/* when a user registers all the admins should receive an email stating*/

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (user,admins) => {
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
    to:admins,
    subject: `${user.first_name} ${user.last_name} has registered with us`,
    text: `Please welcome ${user.first_name} ${user.last_name}`,
    html: "",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
