const Order = require("../models/Order");

const addOrderItems = async (req, res) => {
  try {
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } =
      req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const mappedItems = orderItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product,
        vendor: item.vendor._id ? item.vendor._id : item.vendor,
      }));

      const order = new Order({
        user: req.user._id,
        orderItems: mappedItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (
        order.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this order" });
      }
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order Cancelled Successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "id name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addOrderItems, getMyOrders, deleteOrder, getOrders };
