const mongoose = require("mongoose");
const evaluation = require("./evaluations.model");

const studentsshema = mongoose.Schema({
  roll_id: { type: "string", required: true },
  current_batch: { type: "string", required: true },
  evaluation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: evaluation,
      required: false,
    },
  ],
});

const students = mongoose.model("students", studentsshema);
module.exports = students;
