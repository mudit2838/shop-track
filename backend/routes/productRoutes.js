const express = require("express");
const router = express.Router();

const {
addProduct,
getProducts,
deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/",authMiddleware,addProduct);

router.get("/",authMiddleware,getProducts);

router.delete("/:id",authMiddleware,deleteProduct);

module.exports = router;