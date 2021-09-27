const mongoose = require("mongoose");

const compnayShema = mongoose.Schema({
  name: { type: "string", required: true },
  est: { type: "string", required: true },
  openJob: { type: "string", required: true },
});

const company = mongoose.model("company", compnayShema);
module.exports = company;
