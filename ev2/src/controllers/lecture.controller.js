const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const lectures = require("../models/lecture.model");
/* post "/lectures" => add a new book ( authentication required and only instructors and admins can create a new lecture) */
router.post("/", auth, async (req, res) => {
  if (req.user === "admin" || "instructors") {
    const lect = await lectures.create({
      title: req.body.title,
      instructor: req.body.instructor,
      batch: req.body.batch,
    });
    res.send(lect);
  }
});

/* get "/lectures" => get all lectures ( authentication not required for this endpoint). */
router.get("/", auth, async (req, res) => {
  if (req.user === "admin" || "instructors") {
    res.send(await lectures.find());
  } else {
    res.send("acess forbiden");
  }
});

/* patch "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can update a book ) */
router.patch("/:id", auth, async (req, res) => {
  // res.send(await lectures.findById(req.params.id).populate("instructor"));
  const myres = await lectures.find({ _id: req.params.id });
  let { _id } = req.user;
  if (_id === myres.instructor) {
    const doSome = await lectures.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(doSome);
  }
});

/* delete "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can delete the lecture and image needs to be deleted from the server) */
router.delete("/:id", auth, async (req, res) => {
  const firstStep = await lectures.findById(req.params.id);
  const myres = await lectures.findByIdAndDelete(req.params.id);
  return res.send(await lectures.find());
});

module.exports = router;
