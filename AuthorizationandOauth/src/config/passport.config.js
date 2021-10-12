const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email: email }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        const matchPassword = await user.checkPassword(password);
        if (!matchPassword) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
