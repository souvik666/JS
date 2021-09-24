const express = require("express");
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const usercontroler = require("./controlers/user.controler");
const evaluationcontroller = require("./controlers/evaluations.controler");
const studentsController = require("./controlers/student.controler");

app.use("/users", usercontroler);
app.use("/evaluations", evaluationcontroller);
app.use("/student", studentsController);

app.listen(2345, async (req, res) => {
  connect();
  console.log("listen on port 2345");
});
