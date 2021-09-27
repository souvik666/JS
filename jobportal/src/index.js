const express = require("express");
const app = express();
app.use(express.json());
const connect = require("../congif/db");
const jobsController = require("../controller/job.controller");

app.use("/job", jobsController);
app.listen(2345, async (req, res) => {
  connect();
  console.log("server listening on 2345");
});
