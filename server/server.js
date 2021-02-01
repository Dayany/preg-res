const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");

app.use(cors());

//Import Routes
const questionRoute = require("./routes/question");

app.use(bodyParser.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected")
);

app.use("/question", questionRoute);

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
