/* Create a users collection and it should have */
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: { type: "string", required: true },
  last_name: { type: "string", required: true },
  email: { type: "string", required: true },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
