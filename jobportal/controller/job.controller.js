const express = require("express");
const router = express.Router();
const jobs = require("../models/job.models");

//get all jobs
router.get("/", async (req, res) => {
  const myRes = await jobs.find();
  res.status(200).send({ myRes });
});

//create a job
router.post("/", async (req, res) => {
  const myRes = await jobs.create(req.body);
  res.status(200).send({ myRes });
});

module.exports = router;

//get all jobs in a particular city which matches a particular skill
router.get("/:city", async (req, res)=>{
    
});
