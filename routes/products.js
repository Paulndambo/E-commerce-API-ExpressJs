const express = require("express");

const {
  getAllProducts,
  createNewProduct,
  getSingleProduct,
  updateProduct,
  createManyProducts,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProducts).post(createNewProduct);

router.route("/many-products/").post(createManyProducts);

router.route("/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
