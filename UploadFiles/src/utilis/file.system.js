const fs = require("fs");

/* delete file with inside uploads with specfic file name */
const deleteMe = (profile_pic) => {
  fs.unlink(`./src/uploads/${profile_pic}`, function (err) {
    if (err) throw err;
    console.log(`successfully deleted ./src/uploads/${profile_pic} `);
  });
};

module.exports = deleteMe;
