const router = require("express").Router();
const Product = require("../models/Product");
const Comment = require("../models/Comment");
   
router.get("/", (req, res, next) => {
    Product.find({})
    .sort({ createdAt: "desc"})
    .then((results) => {
        return res.send(results);
    })
})

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

//Get by Id
router.get("/:id", (req, res, next) => {
  return res.status(200).send(req.product);
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
  product.save().then((result) => {
    res.status(201).send(result);
  })
  .catch(next);
})

//Post Products Comments
router.post("/:id/comments", (req, res, next) => {
  const comment = new Comment(req.body);
  comment.save().then((result) => {
    res.status(201).send(result);
    console.log(comment.product);
  })
  .catch(next);
})

router.get("/:id/comments", (req, res, next) => {
  Comment.find({product: req.product._id})
    .sort({ createdAt: 1 })
    .then((comments) => {
      res.status(200).send(comments);
    });
});

router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.product.id)
  .then((product) => {
    res.status(204).send(product);
  })
  .catch(next);
});

module.exports = router;
