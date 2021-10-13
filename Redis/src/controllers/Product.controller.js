const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const redis = require("../configs/redis.config");

/* create Product */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  redis.set(`productCache.${product._id}`, JSON.stringify(req.body));
  const allProduct = await Product.find().lean().exec();
  redis.set("productCache", JSON.stringify(allProduct));
  res.send({ product });
});

/* get all Prodcuts */
router.get("/", async (req, res) => {
  redis.get("productCache", async function (err, product) {
    if (err) console.log(err);
    if (product) return res.status(200).json({ cache: JSON.parse(product) });
    const product_from_db = await Product.find().lean().exec();
    redis.set("productCache", JSON.stringify(product_from_db));
    return res.send({ product_from_db: product_from_db });
  });
});

/* get signle product withh id*/
router.get("/:id", async (req, res) => {
  //look if redis already have the product
  redis.get(`productCache.${req.params.id}`, async (err, product) => {
    if (err) console.log(err);
    if (product) return res.status(200).send({ cache: JSON.parse(product) });
    const db_product = await Product.findById(req.params.id);
    redis.set(`productCache.${db_product._id}`, JSON.stringify(db_product));
    return res.send({ product_from_db: db_product });
  });
});

/* Update user info */
router.patch("/:id", async (req, res) => {
  const db_product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  redis.set(`productCache.${db_product._id}`, JSON.stringify(db_product));
  const allProduct = await Product.find().lean().exec();
  redis.set("productCache", JSON.stringify(allProduct));
  return res.send({ success: db_product });
});

/* delete a product */
router.delete("/:id", async (req, res) => {
  const whichProdcut = await Product.findByIdAndDelete(req.params.id);
  redis.del(`productCache.${req.params.id}`);
  const allProduct = await Product.find().lean().exec();
  redis.set("productCache", JSON.stringify(allProduct));
  res.send({ success: true });
});

module.exports = router;
