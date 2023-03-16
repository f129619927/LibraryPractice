const passport = require("passport");
const router = require("express").Router();
const regsiterVaildation = require("../vaildation").regsiterVaildation;
const loginVaildation = require("../vaildation").loginVaildation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");
router.use((req, res, next) => {
  console.log("進入auth router");
  next();
});
//創帳號
router.post("/register", async (req, res) => {
  console.log("register");
  let { error } = regsiterVaildation(req.body);
  if (error) {
    console.log("register error");
    return res.status(400).send(error.details[0].message);
  }
  let emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    console.log("register emailerror");
    return res.status(400).send("此信箱註冊過");
  }
  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password });
  try {
    let saveUser = await newUser.save();
    console.log("register save");
    return res.send({ message: "save", saveUser });
  } catch (e) {
    console.log("register saveerror");
    return res.status(500).send(e);
  }
});
//登入
router.post("/login", async (req, res) => {
  let { error } = loginVaildation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    return res.status(401).send("查無此信箱");
  }
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    if (isMatch) {
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "登入成功",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(400).send("密碼錯誤");
    }
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

module.exports = router;
