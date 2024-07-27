const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./Router/user");
const authRoute = require("./Router/auth");
const productsRoute = require("./Router/product");
const cartsRoute = require("./Router/cart");
const orderRoute = require("./Router/order");

dotenv.config();
const app = express();
const Port = 8000;

// connected mongoDb
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Database is not connected", err);
  });

app.use(express.json());
// App Route
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("./api/cart", cartsRoute);
app.use("./api/order", orderRoute);

// App Listen
app.listen(Port, (err) => {
  if (err) {
    console.log(err, "server is not Started");
  } else {
    console.log("Server is started");
  }
});
