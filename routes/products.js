const router = require("express").Router();
const Products = require("../models/Product");
const Product = require("../models/Product");

router.param("id",(req,res,next,id) => {
    Products.findById(id)
    .populate("title")
    .then((product) => {
        if(!product) {
            res.status(404).send("Product not found");
        } else{
            res.product = product;
            return next();
        }
    })
    .catch(next);
})

router.get("/", (req, res, next) => {
    Products.find({})
    .select("Title description")
    .sort({createdAt:"desc"})
    .then((results) => {
        return res.send(results)
    })
    .catch(next)
})

router.post("/",(req, res, next) => {
    const product = new Product(req.body);
    product
    .save()
    .then((result) => {
        return res.status(201).send(result)
    })
    .catch(next)
}) 

router.get("/:id", (req, res, next) => {
    return res.status(200).send(req.product);
  });
  
  router.put("/:id", (req, res, next) => {
    Article.findByIdAndUpdate(req.product.id, req.body)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch(next);
  });
  
  
  
module.exports = router;