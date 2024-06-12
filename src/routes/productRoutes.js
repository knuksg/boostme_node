const express = require("express");
const {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    getProductsBySales,
} = require("../controllers/productController");
const router = express.Router();

router.get("/sales", getProductsBySales);
router.get("/category/:category", getProductsByCategory);

router.post("/", addProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);

module.exports = router;
