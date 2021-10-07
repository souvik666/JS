const express = require("express");
const router = express.Router();
const gallery = require("../models/gallery.model");
const upload = require("../utilis/file.upload");
const deleteMe = require("../utilis/file.system");

/* get all gallery files */
router.get("/", async (req, res) => {
  res.send(await gallery.find());
});

/* Adding photos to the gallery ( User can upload only 5 photos at a time and in multer.array() there is way to do this) */
router.post("/:id", upload.any("pictures"), async (req, res) => {
  const filenames = req.files.map((file) => file.originalname);
  const mygallery = await gallery.create({
    user_id: req.params.id,
    pictures: filenames,
  });
  return res.status(200).send({ mygallery });
});

/* Deleting photos from the gallery ( here also files should be deleted from the server ) Please Note :- For deleting files from the server you can use the 'fs' module that comes with Node. */
router.delete("/:id", async (req, res) => {
  const myres = await gallery.findOne({ _id: req.params.id });
  let { pictures } = myres;
  let newPicture = [];
  for (let i of pictures) {
    if (i !== req.body.pictures) {
      newPicture.push(i);
    }
  }
  deleteMe(req.body.pictures);
  const finalres = await gallery.findByIdAndUpdate(
    req.params.id,
    {
      pictures: newPicture,
    },
    { new: true }
  );
  res.send(await gallery.find());
});

module.exports = router;
