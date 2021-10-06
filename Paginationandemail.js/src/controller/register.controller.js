/* create endpoint for registering where in the user can register and when he registers we should send him a confirmation email and the contents of that will be */
const express = require("express");
const router = express.Router();
const email = require("../utilis/mail");
const alertAdmins = require("../controller/notification.controller")
const userModle = require("../model/user.model");
router.get("/", async (req, res) => {
  res.render("index", {});
});

router.post("/", async (req, res) => {
  let user = req.body;
  const myusers = await userModle.create(req.body);
  email(user);
  alertAdmins()
  console.log(myusers);
});

module.exports = router;
