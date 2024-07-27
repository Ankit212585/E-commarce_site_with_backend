const router = require("express").Router();
const User = require("../model/User");

const cryptoJS = require("crypto-js"); //there is the outer package
const { route } = require("./user");
// Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(req.body.password, "panwar"),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong candidate");
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      "panwar"
    );
    const password = hashedPassword.toString(cryptoJS.enc.Utf8);

    password !== req.body.password &&
      res.status(401).json("wrong candidate");

    res.status(200).json(user);
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;
