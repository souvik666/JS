const express = require("express");
const session = require("express-session");
const User = require("./src/models/user.model");
const passport = require("./src/config/passport.config");
const app = express();
app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const connect = require("./src/config/db");
const userController = require("./src/controllers/register.controller");
const productController = require("./src/controllers/products.controller");
app.use("/register", userController);

app.use("/product", productController);

app.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send(req.user);
});

app.listen(2345, async (req, res) => {
  connect();
  console.log("listening on 2345");
});
