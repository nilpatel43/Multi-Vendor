const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, vendorAuth } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getProducts)
  .post(protect, vendorAuth, upload.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, vendorAuth, upload.single("image"), updateProduct)
  .delete(protect, vendorAuth, deleteProduct);

module.exports = router;
