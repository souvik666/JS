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

//find all the jobs that will accept a notice period of 2 months
router.get("/notice/:pre", async (req, res) => {
  const notice_period = req.params.pre;
  const myRes = await jobs.find({ notice_period: notice_period });
  res.send({ myRes });
});

//get all jobs in a particular city which matches a particular skill
router.get("/:city/:skill", async (req, res) => {
  const clientCity = req.params.city;
  const clientSkill = req.params.skill;
  const resForYou = await jobs.find({
    $and: [
      { city: clientCity },
      { skill: clientSkill },
      { work_from_home: true },
    ],
  });
  res.send({ resforyou: resForYou });
});

/* find all jobs by sorting the jobs as per their rating. */

router.get("/sort/:indecation", async (req, res)=>{
    
});
