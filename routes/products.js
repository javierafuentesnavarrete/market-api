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
   
router.get("/", (req, res, next) => {
    console.log(req)
    Product.find({})
    .sort({ createdAt: "desc"})
    .then((results) => {
        return res.send(results);
    })
    .catch(next);
});

// router.post("/", (req, res, next) => {
//     const products = new Product(req.body);
//     product.save().then((result => {
//         res.status(201).send(result);
//     }))
// })

module.exports = router;
