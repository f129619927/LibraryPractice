const router = require("express").Router();
const regsiterVaildation = require("../vaildation").regsiterVaildation;
const User = require("../models").user;

router.use((req, res, next) => {
  console.log("進入auth router");
  next();
});
router.get("/", (req, res) => {
  console.log("e");
  return res.send("get ");
});
router.post("/regsiter", async (req, res) => {
  console.log("regsiter");
  let { error } = regsiterVaildation(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  let emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    console.log("此信箱註冊過");
    return res.status(400).send("此信箱註冊過");
  }
  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password });
  try {
    let saveUser = await newUser.save();
    console.log(saveUser);
    return res.send({ message: "save", saveUser });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

module.exports = router;
