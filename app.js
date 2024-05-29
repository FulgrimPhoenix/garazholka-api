const express = require("express");
const app = express();
require("dotenv").config();

const { PORT = 3000 } = process.env;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server listen ${PORT} PORT`)
);
