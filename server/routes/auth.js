const router = require("express").Router();
const regsiterVaildation = require("../vaildation").regsiterVaildation;
const loginVaildation = require("../vaildation").loginVaildation;
const User = require("../models").user;

router.use((req, res, next) => {
  console.log("進入auth router");
  next();
});

router.post("/regsiter", async (req, res) => {
  let { error } = regsiterVaildation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return res.status(400).send("此信箱註冊過");
  }
  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password });
  try {
    let saveUser = await newUser.save();
    return res.send({ message: "save", saveUser });
  } catch (e) {
    return res.status(500).send(e);
  }
});
router.post("/login", async (req, res) => {
  let { error } = loginVaildation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { email, password } = req.body;
  let foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(400).send("查無此信箱");
  }
});

module.exports = router;
