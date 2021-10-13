const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  price: { type: "string", required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;