/* Create a user model which has the following things
first_name
last_name
profile_pic ( can be 1 only ) */

const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  first_name: { type: "string", required: false },
  last_name: { type: "string", required: false },
  profile_pic: { type: "string", required: true },
});

const user = mongoose.model("user", userModel);

module.exports = user;
