const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(err);
  });
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on Port ${process.env.PORT}`);
});
