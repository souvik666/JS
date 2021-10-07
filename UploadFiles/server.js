const express = require("express");
const app = express();
const connect = require("./src/config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userController = require("./src/controller/user.controller");
const userGalleryConstroller = require("./src/controller/gallery.controller");
app.use("/user", userController);
app.use("/gallery", userGalleryConstroller);

app.listen(2345, async (req, res) => {
  await connect();
  console.log("listening on port 2345");
});
