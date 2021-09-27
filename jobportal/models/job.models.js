const mongoose = require("mongoose");
const compnaymod = require("./company.model");
const jobSchema = mongoose.Schema({
  city: { type: "string", required: true },
  skill: { type: "string", required: true },
  work_from_home: { type: "string", required: true },
  notice_period: { type: "string", required: true },
  rating: { type: "string", required: true },
  compnay: { type: mongoose.Schema.Types.ObjectId, ref: compnaymod },
});

const job = mongoose.model("job", jobSchema);

module.exports = job;
