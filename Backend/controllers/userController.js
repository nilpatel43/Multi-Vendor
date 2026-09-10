const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === "admin") {
        return res.status(400).json({ message: "Cannot delete admin user" });
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User/Vendor removed successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Navo Profile Update Code
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;

      // Jo vendor hoy to shop details pan update thase
      if (user.role === "vendor") {
        user.shopName = req.body.shopName || user.shopName;
        user.shopNumber = req.body.shopNumber || user.shopNumber;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        shopName: updatedUser.shopName,
        shopNumber: updatedUser.shopNumber,
        token: req.headers.authorization.split(" ")[1],
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getUsers, deleteUser, updateUserProfile };
