const express = require("express");
const router = express.Router();
const upload = require("../utilis/file.upload");
const deleteMe = require("../utilis/file.system");

//models
const user = require("../models/user.model");

/* get all users */
router.get("/", async (req, res) => {
  res.send(await user.find());
});

/* Creating a user */
router.post("/", upload.single("profile_pic"), async (req, res) => {
  const myUser = await user.create({
    profile_pic: req.file.originalname, //only saving the original name
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  res.status(200).send(myUser);
});

/* updating a user */
router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  const whoami = await user.findById(req.params.id);
  let { profile_pic, first_name, last_name } = whoami;
  deleteMe(profile_pic);
  const myres = await user.findByIdAndUpdate(req.params.id, {
    profile_pic: req.file.originalname,
  });
  res.send(await user.find());
});

/* deleting a user */
router.delete("/:id", async (req, res) => {
  const whoami = await user.findByIdAndDelete(req.params.id);
  let { profile_pic, first_name, last_name } = whoami;
  deleteMe(profile_pic);
  res.status(200).send(`successfully deleted ${profile_pic}`);
});

module.exports = router;
