const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./routes").auth;
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/passport");
mongoose
  .connect("mongodb://127.0.0.1:27017/bookstoredb")
  .then(() => {
    console.log("Mongodb");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({}));

app.use((req, res, next) => {
  console.log("進入app router");
  next();
});
app.use("/api/auth", authRouter);

app.listen("8080", () => {
  console.log("listening port8080");
});
