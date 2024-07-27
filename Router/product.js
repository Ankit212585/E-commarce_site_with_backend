const router = require("express").Router();
const Product = require("../model/Product");
const { verifyTokenAndAuthorization } = require("./varifyToken");

// create

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const saveProduct = await newProduct.save();
    console.log(saveProduct);
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(400).json("something went wrong", err);
    console.log(err);
  }
});

// Get Product by _id

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(`product cannot be get ${err}`);
    console.log(`product cannot be get ${err}`);
  }
});

// Get Product by id

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(`product cannot be get ${err}`);
    console.log(`product cannot be get ${err}`);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
      res.status(200).json(updateProduct)
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
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
      console.log(`product will be not deleted ${err}`);
    }
  }
);

module.exports = router;
