const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.create(req.body);
      return res.status(200).json({ user });
    } else {
      return res
        .status(404)
        .json({ msg: "please enter a unique email address" });
    }
  } catch (err) {
    res.send({ msg: err });
  }
});

module.exports = router;
