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

app.get("/", (req, res) => {
  console.log(`${req.method} request received...`);
  res.send("Hello, welcome to the products api!");
});

const product = require("./routes/products.js");
const users = require("./routes/users.js");
app.use("/products", product);
app.use("/users", users);

//ERRORS

// app.use((req, res, next) => {
//   const error = new Error("Endpoint Not Found");
//   error.status = 404;
//   next(error)
// });

// app.use((err, req, res, next) => {
//   if (!isProduction) {
//     console.log(err.stack);
//   }

//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: err,
//     },
//   });
// });
