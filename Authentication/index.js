const express = require("express");
const app = express();
app.use(express.json());
const { register, login } = require("./src/controller/auth.controller");
const postsController = require("./src/controller/post.controller");
app.post("/register", register);
app.post("/login", login);
app.use("/posts", postsController);

module.exports = app;
