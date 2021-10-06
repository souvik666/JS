/* An endpoint to get the paginated users should be available */
const users = require("../model/user.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.size || 10;
  const offset = (page - 1) * size;
  const myres = await users.find().skip(offset).limit(size).lean().exec();
  const length = await users.find().countDocuments();
  const totalpages = Math.ceil(length / size);
  res.send({
    myres,
    totalpages,
  });
});
module.exports = router;
