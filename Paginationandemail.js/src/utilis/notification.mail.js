/* create endpoint for registering where in the user can register and when he registers we should send him a confirmation email and the contents of that will be */

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (user, admin) => {
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
    to: admin,
    subject: `${user.first_name} ${user.last_name} has registered with us`,
    text: ` Please welcome ${user.first_name} ${user.last_name}`,
    html: "",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
