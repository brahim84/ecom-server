const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);

// Public: Anyone can list and view products
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search", searchProducts);

// Protected: Only admin can create/update/delete
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);


// router
//   .route("/:id")
//   .get(getProductById)
//   .put(updateProduct)
//   .delete(deleteProduct);

module.exports = router;
