const express = require("express");
const router = express.Router();
const company = require("../models/company.model");

//get all company
router.get("/", async (req, res) => {
  const myres = await company.find();
  res.send({ myres });
});

//create a company
router.post("/", async (req, res) => {
  const myRes = await company.create(req.body);
  res.send({ myRes });
});

module.exports = router;
