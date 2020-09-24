const router = require("express").Router();
const Product = require("../models/Product");


router.param("category", function(req, res, next, category) {
    Product.findById(category).then((product) => {
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        req.product = product;
        next();
      }
    })
    .catch(next);
   });
   
router.get(":id", (req, res, next) => {
    res.status(200).send(req.product);
});

// router.post("/", (req, res, next) => {
//     const products = new Product(req.body);
//     product.save().then((result => {
//         res.status(201).send(result);
//     }))
// })

module.exports = router;
