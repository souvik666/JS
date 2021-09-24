const express = require("express");
const router = express.Router();
const user = require("../models/users.models");

//create an instrator
router.post("", async (req, res) => {
  const User = await user.create(req.body);
  res.status(200).send({ User });
});

router.get("", async (req, res) => {
  let allusers = await user.find();
  res.status(200).send({ allusers });
});

module.exports = router;
