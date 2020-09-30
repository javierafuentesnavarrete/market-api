const router = require("express").Router();
const User = require("../models/User.js");
const Product = require("../models/Product.js");

router.get("/", (req, res) => {
  console.log(`${req.method} request received to /users...`);
});

router.post("/", function (req, res, next) {
  console.log("POST recieved")
  //server-side validation
  if (!req.body.firstname) {
    return res.status(422).send("First name can't be blank");
  }
  if (!req.body.lastname) {
    return res.status(422).send("Last name can't be blank");
  }
  if (!req.body.username) {
    return res.status(422).send("Username can't be blank");
  }
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log("User already exists");
        return res.status(422).send("User already exists");
      }
      const newUser = new User(req.body);
      newUser
        .save()
        .then((result) => {
          return res.send(result);
        })
        .catch(next);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  
  if (!req.body.email) {
    res.status(422).send("Email can't be blank");
  }

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        return res.status(422).send("User not found");
      }
      return res.send(user);
    })
    .catch(next);
});

//Users Products
router.get("/:id/products", (req, res, next) => {
  Product.find({ email: req.body.email })
    .sort({ createdAt: "desc" })
    .then((products) => {
      res.status(200).send(products);
    });
});

module.exports = router;
