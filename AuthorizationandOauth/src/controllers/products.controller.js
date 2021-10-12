//creating a prodcut
const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");
const passport = require("../config/passport.config");

router.post("/", async (req, res, next) => {
  if (req.isAuthenticated()) {
    const tmp = await Product.create({
      name: req.body.name,
      price: req.body.price,
      seller: req.user._id,
    });
    res.send(tmp);
    next();
  }
});



module.exports = router;
