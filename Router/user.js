const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./varifyToken");
const CryptoJS = require("crypto-js");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      "panwar"
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      },
      res.status(200).json(updatedUser)
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
