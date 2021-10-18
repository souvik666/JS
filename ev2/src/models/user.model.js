const mongoose = require("mongoose");

const userShcmea = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  profile_photo_url: { type: "string", required: true },
  roles: { type: "string", required: true },
});

const User = mongoose.model("User", userShcmea);

module.exports = User;
