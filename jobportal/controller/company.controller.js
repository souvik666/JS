/* an api to get details of the company.
 */
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

/* find the company that has the most open jobs.
 */
router.get("/most_open", async (req, res) => {
  const myres = await company.find().sort({ openJob: 1 }).limit(1);
  res.send({ myres });
});

module.exports = router;
