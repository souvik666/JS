const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("last_name").isLength({ min: 3 }).withMessage("please enter an name"),
  body("first_name").isLength({ min: 3 }).withMessage("please enter an name"),
  body("email").isEmail().withMessage("please enter an valid email"),
  body("pincode")
    .trim()
    .isNumeric()
    .isLength({ min: 6 }, { max: 6 })
    .withMessage("please enter an valid pincode"),
  body("age")
    .trim()
    .isNumeric()
    .isLength({ min: 1 }, { max: 100 })
    .withMessage("please enter an valid age"),
  body("gender")
    .trim()
    .isLength({ min: 1 })
    .custom((value) => {
      if (value === "M" || value === "F") {
        return true;
      }
      return false;
    })
    .withMessage("please enter an valid gender(M or F)"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ params: errors.array()[0].param, msg: errors.array()[0].msg });
    } else {
      const mynewUser = await user.create(req.body);
      res.send({ newuser: mynewUser });
    }
  }
);

module.exports = router;
