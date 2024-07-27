const router = require("express").Router();
const User = require("../model/User");

const CryptoJS = require("crypto-js"); //there is the outer package

const jwt = require("jsonwebtoken");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./varifyToken");

// Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "panwar"
    ).toString(),
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
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      "panwar"
    );

    const Originalpassword = hashedPassword.toString(
      CryptoJS.enc.Utf8
    );

    Originalpassword !== req.body.password &&
      res.status(401).json("wrong candidate");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.JWT_Sec,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    console.log(...others, accessToken);
    res.status(200).json(...others, accessToken);
  } catch (err) {
    console.log(err, "kuch smz ni aa rha err kha hai...?😁");
    res.status(500).json(err);
  }
});

// Delete method

router.delete(
  "/:id",
  // verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get Admin User

router.get(
  "/find/:id",
  // verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      console.log(err);
      res.status(400).json("user cannot found", err);
    }
  }
);

// Get all User

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json("user cannot found", err);
  }
});

module.exports = router;
