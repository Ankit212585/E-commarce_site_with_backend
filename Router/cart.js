const router = require("express").Router();
const Cart = require("../model/Cart");
const { verifyTokenAndAuthorization } = require("./varifyToken");

// create

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveProduct = await newCart.save();
    console.log(saveProduct);
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(400).json("something went wrong", err);
    console.log(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
      res.status(200).json(updateCart)
    );
  } catch (err) {
    res.status(400).json();
    console.log(`somthing went wrong ${err}`);
  }
});

// Delete method

router.delete(
  "/:id",
  // verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
      console.log(`product will be not deleted ${err}`);
    }
  }
);
// Get USER Cart by _id

router.get("/find/:userid", async (req, res) => {
  try {
    const cart = await Cart.findOne(req.params.userid);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(`product cannot be get ${err}`);
    console.log(`product cannot be get ${err}`);
  }
});

// Get all Carts

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json(err);
    console.log(`Something went wrong cart will not delete ${err}`);
  }
});

module.exports = router;
