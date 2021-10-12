//user model
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchmea = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    roles: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchmea.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = bcrypt.hashSync(this.password, 8);
  this.password = hashedPassword;
  return next();
});

userSchmea.pre("save", function (next) {
  if (this.roles.length === 0) {
    this.roles.push("user");
  }
  return next();
});

userSchmea.methods.checkPassword = function (password) {
  const compare = bcrypt.compareSync(password, this.password);
  return compare;
};

const User = mongoose.model("User", userSchmea);
module.exports = User;
