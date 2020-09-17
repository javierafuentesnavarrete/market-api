const router = require("express").Router();
const User = require("../models/User.js");

router.post("/register", function (req, res, next) {
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

module.exports = router;