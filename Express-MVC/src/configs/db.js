const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(`mongodb://127.0.0.1:27017/lms`);
  console.log("Connected to mongodb")
};

module.exports = connect;
