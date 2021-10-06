/* when a user registers all the admins should receive an email stating */
const email = require("../utilis/notification.mail");
const admins = [
  "bar@example.com, baz@example.com",
  "ba3z@example.com",
  "baz4@example.com",
  "ba5z@example.com",
];

const alertAdmins = (user) => {
  //email(user, admins);
  for (let i of admins) {
    email(user, i);
  }
};

module.exports = alertAdmins;
