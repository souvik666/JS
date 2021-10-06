const express = require("express");
const app = express();
const registerController = require("./controller/register.controller");
const userController = require("./controller/user.controller");
const connect = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use("/register", registerController);
app.use("/user", userController)
app.listen(2345, async (req, res) => {
  await connect();
  console.log("listening on 2345");
});
