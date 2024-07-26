const express = require("express");

const userRoute = require("./Router/user");
const authRoute = require("./Router/auth");

const app = express();
const Port = 8000;

// connected mongoDb
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ankitpanwar212585:%40Ankit@learnmongo.kvmtcu1.mongodb.net/"
  )
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
// App Listen
app.listen(Port, (err) => {
  if (err) {
    console.log(err, "server is not Started");
  } else {
    console.log("Server is started");
  }
});
