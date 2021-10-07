const multer = require("multer");
const Path = require("path");

//storage setup
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, Path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

//file filtering rule
const fileFilter = function (req, file, callback) {
  if (file.mimetyp === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

//mother function for multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
