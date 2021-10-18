const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
/* post "/users" => which will create a user and also the profile_photo has to be uploaded along with suitable role. */
const createToken = (user) => {
  return jwt.sign({ user }, process.env.jwt_secret);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send("User Already exisit");
    } else {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        profile_photo_url: req.file.originalname,
      });
      const token = createToken(newUser);
      res.send({ token: token, user: newUser });
    }
  } catch (err) {
    res.send(err);
  }
};

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.password === req.body.password) return res.send(user);
  } else {
    return res.send("please chek your email and password");
  }
};

module.exports = { register, loginUser };
