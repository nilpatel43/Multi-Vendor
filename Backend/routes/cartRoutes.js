const express = require("express");
const router = express.Router();
const { getCart, saveCart } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getCart).post(protect, saveCart);

module.exports = router;
