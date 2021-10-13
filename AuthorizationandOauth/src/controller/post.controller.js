const express = require("express");
const router = express.Router();
const Posts = require("../model/posts.model");
const auth = require("../middleware/authenticate");
const autho = require("../middleware/authorize");
router.post("/", auth, async function (req, res) {
  const newPost = await Posts.create({
    title: req.body.title,
    body: req.body.body,
    user: req.user._id,
  });
  res.send({ newPost });
});
router.get("/", auth,autho, async (req, res) => {
  const myres = await Posts.find().populate("user");
  res.send(myres);
});

module.exports = router;
