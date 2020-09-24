const router = require("express").Router();
const Product = require("../models/Product.js");

//Product Parameter
router.param("id", function(req, res, next, id) {
  Product.findById(id).then((product) => {
    if (!product) {
      res.status(404).send("User not found");
    } else {
      req.product = product;
      next();
    }
  })
  .catch(next);
})

//Edit Product
router.put("/:id", (req, res, next) => {
  Product.findByIdAndUpdate(req.product.id, req.body)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(next);
});

// Post Product
router.post("/", (req, res, next) => {
  const product = new Product(req.body);
  product.save().then((result => {
    res.status(201).send(result);
  }))
  .catch(next);
})

module.exports = router;