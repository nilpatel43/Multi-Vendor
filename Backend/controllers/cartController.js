const Cart = require("../models/cartModel");

// Get Cart for logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      res.json(cart.cartItems);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or Update Cart for logged-in user
const saveCart = async (req, res) => {
  const { cartItems } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.cartItems = cartItems;
      const updatedCart = await cart.save();
      res.json(updatedCart.cartItems);
    } else {
      const newCart = await Cart.create({
        user: req.user._id,
        cartItems,
      });
      res.json(newCart.cartItems);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, saveCart };
