const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifytoken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwt_secret, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    });
  });
};

const authenticateUser = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken !== null && !bearerToken.startsWith("bearer")) {
    let tmp = bearerToken.split(" ")[1];
    jwt.verify(tmp, process.env.jwt_secret, function (err, user) {
      if (err) console.log("You are are a valid user" + err);
      req.user = user;
      return next();
    });
  }
};

module.exports = authenticateUser;
