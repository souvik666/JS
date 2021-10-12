const User = require("./user.model");

const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: "string", required: true },
    price: { type: "number", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.methods.updatePrice = function (value) {
  this.price = value;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
