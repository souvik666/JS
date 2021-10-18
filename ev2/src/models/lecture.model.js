const mongoose = require("mongoose");
const user = require("../models/user.model");

const lectureShcmea = new mongoose.Schema({
  title: { type: "string", required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: user },
  batch: { type: "string", required: true },
});

const lecture = mongoose.model("lecture", lectureShcmea);
module.exports = lecture
