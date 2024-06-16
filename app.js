const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const constants = require("./utils/constants");
const { router } = require("./routes");

const app = express();
require("dotenv").config();

const { PORT = 3000, URL = constants.URLs.dbUrl } = process.env;

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(`connection failed: ${err}`));

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server listen ${PORT} PORT`)
);

app.use(router);
