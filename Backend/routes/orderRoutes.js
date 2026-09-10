const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  deleteOrder,
  getOrders, 
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").delete(protect, deleteOrder);

module.exports = router;
