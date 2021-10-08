const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const connect = require("./src/config/db");
const userController = require("./src/controllers/user.controller");
app.use("/user", userController);

app.listen(2345, async (req, res) => {
  connect();
  console.log("listening on 2345");
});
