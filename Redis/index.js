const express = require("express");
const app = express();
const connect = require("./src/configs/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//controllers
const ProductController = require("./src/controllers/Product.controller");

app.use("/product", ProductController);

app.listen(2345, async (req, res) => {
  connect();
  console.log("listening on " + 2345);
});
