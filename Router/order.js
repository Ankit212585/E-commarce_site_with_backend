const router = require("express").Router();
const Order = require("../model/Order");
const { verifyTokenAndAuthorization } = require("./varifyToken");

// create

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    console.log(saveOrder);
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(400).json("something went wrong", err);
    console.log(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
      res.status(200).json(updateOrder)
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
      await Order.findByIdAndDelete(req.params.id);
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
    const order = await Order.findOne(req.params.userid);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(`product cannot be get ${err}`);
    console.log(`product cannot be get ${err}`);
  }
});

// Get all Carts

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
    console.log(`Something went wrong cart will not delete ${err}`);
  }
});

// Get monthly Income

router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - 1)
  );
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $get: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(`something went wrong ${err}`);
  }
});

module.exports = router;
