const express = require("express");
const stundt = require("../models/studnet.model");
const router = express.Router();

router.get("/", async (req, req) => {
  const myres = await stundt.find({ role: "student" });
  res.send(myres);
});
