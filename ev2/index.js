const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const upload = require("./src/utilis/file.uplaod");

const connect = require("./src/config/db");
const { register, loginUser } = require("./src/controllers/auth.controller");
const lecturecControler = require("./src/controllers/lecture.controller");
app.post("/register", upload.single("profile_photo_url"), register);
app.post("/login", loginUser);

app.use("/lecture", lecturecControler);

app.listen(2345, async (req, res) => {
  connect();
  console.log("listing on port 2345");
});
