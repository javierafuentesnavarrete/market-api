const express = require("express");

const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("open", function (ref) {
  app.listen(3001, () => {
    console.log("Listening on port 3000...");
  });
});

app.get("/", (req, res) => {
  console.log(`${req.method} request received...`);
  res.send("Hello, welcome to the products api!");
});

const products = require("./routes/products.js");
const users = require("./routes/users.js");
app.use("/products", products);
app.use("/users", users);