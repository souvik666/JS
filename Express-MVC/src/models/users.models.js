const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: { type: "string", required: true },
    last_name: { type: "string", required: true },
    gender: { type: "string", required: true },
    date_of_birth: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
