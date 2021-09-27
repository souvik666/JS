const express = require("express");
const router = express.Router();
const evaluationsShema = require("../models/evaluations.model");
const students = require("../models/student.model");

//create a new evaluation
router.post("", async (req, res) => {
  const evaluations = await evaluationsShema.create(req.body);
  res.send({ evaluations: evaluations });
});

//get all evaluations
router.get("", async (req, res) => {
  const evaluations = await evaluationsShema.find().populate("instructor");
  res.send({ evaluations: evaluations });
});

//create evaluation fro specific batch
router.post("/:batch", async (req, res) => {
  /*  const tmp = await students.updateMany(
    { current_batch: "web_11" },
    [{ $set: { score: [] } }],
    {
      new: true,
    }
  ); */
  const studentswithBatch = await students
    .updateMany(
      { current_batch: "web_11" },
      { $push: { evaluation: req.body.evaluation } },
      {
        new: true,
      }
    )
    .lean()
    .exec();
  res.send(await students.find());
});

//fetch all students who gave a particular evaluation
router.get("/:evID", async (req, res) => {
  let student = await students.find({ evaluation: req.params.evID });
  res.status(200).send({ student });
});

module.exports = router;
