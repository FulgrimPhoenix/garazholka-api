const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const { PORT = 3000, URL = "mongodb://0.0.0.0:27017/garazholkadb" } =
  process.env;

mongoose
  .connect(URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(`connection failed: ${err}`));

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server listen ${PORT} PORT`)
);
