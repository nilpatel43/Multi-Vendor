const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect, adminAuth } = require("../middlewares/authMiddleware");

router.route("/").get(protect, adminAuth, getUsers);
router.route("/profile").put(protect, updateUserProfile); // Navi line: DB ma profile save karva mate
router.route("/:id").delete(protect, adminAuth, deleteUser);

module.exports = router;
