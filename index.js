const express = require("express");
const morgan = require("morgan");

const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("open", function (ref) {
  app.listen(3000, () => {
    console.log("Listening on port 3000...");
  });
});

const products = require("./routes/products.js");
const users = require("./routes/users.js");
app.use("/products", products);
app.use("/users", users);