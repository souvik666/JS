const mongoose = require("mongoose");
const user = require("./users.models");

const evaluationSchema = mongoose.Schema({
  date_of_evaluation: { type: "string", required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  topic: { type: "string", required: true },
});

const evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = evaluation;
