const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  first_name: { type: "string", required: true },
  last_name: { type: "string", required: true },
  email: { type: "string", required: true },
  pincode: { type: "string", required: true },
  age: { type: "string", required: true },
  gender: { type: "string", required: true },
});

const user = mongoose.model("user", userShcema);
module.exports = user;
