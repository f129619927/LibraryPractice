const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstoredb")
  .then(() => {
    console.log("Mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen("8080", () => {
  console.log("listening port8080");
});
