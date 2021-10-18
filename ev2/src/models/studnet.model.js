const mongoose = require("mongoose");
const user = require("../models/user.model");


const studentShcmea = new mongoose.Schema({
  roll_number: { type: "string", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: user },
  batch: { type: "string", required: true },
});


const student = mongoose.model("student", studentShcmea);
module.exports = student;
