const mongoose = require("mongoose");

//connection
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/Oauth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
