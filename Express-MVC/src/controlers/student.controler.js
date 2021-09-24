const express = require("express");
const router = express.Router();
const students = require("../models/student.model");

//get all students
router.get("/", async (req, res) => {
  const student = await students.find();
  res.send({ student });
});

//create a new student
router.post("/", async (req, res) => {
  let createdstudent = await students.create(req.body);
  res.status(200).send({ createdstudent });
});

//fetch the student with his personal details who scored the highest mark in the evaluation
router.get("/high", async (req, res) => {
  let myRes = await students.find().sort({ score: 1 }).limit(1);
  res.send(myRes);
});

module.exports = router;
