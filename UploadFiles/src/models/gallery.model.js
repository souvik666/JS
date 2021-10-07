/* Create a gallery model which will belong to the user
pictures ( multiple images are allowed )
user_id ( belong to the user) */

const mongoose = require("mongoose");
const user = require("./user.model");

const galleryModle = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: user },
  pictures: [],
});

const gallery = mongoose.model("gallery", galleryModle);

module.exports = gallery;
