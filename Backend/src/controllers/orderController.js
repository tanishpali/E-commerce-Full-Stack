const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");

const mongoose = require("mongoose");
const { isValid } = require("./validator");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "productName price");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ msg: "Cart is Empty" });
    }

    const { totalItems, totalPrice, items } = cart;
    const { shippingAddress } = req.body;

    if (!isValid(shippingAddress)) {
      return res.status(400).json({ msg: "Shipping Address is Required" });
    }

    const orderData = {
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalItems,
      totalPrice,
      shippingAddress,
    };

    const newOrder = await orderModel.create(orderData);

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();
    return res.status(201).json({ msg: "Order Placed Successfully", newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get My Order
const getMyOrder = async (req, res) => {
  try {
    let userId = req.user.userId;

    const orders = await orderModel
      .findOne({ userId })
      .populate("items.productId", "productImage productName price");

    if (orders.length === 0) {
      return res.status(404).json({ msg: "No Order Found" });
    }

    return res.status(200).json({ msg: "Your Orders", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    let orderId = req.params.id;

    let userId = req.user.userId;

    // OrderId Validation
    if (!isValid(orderId) || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ msg: "Valid orderId is Required" });
    }

    let order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ msg: "Order Not Found" });
    }

    if (order.orderStatus !== "pending") {
      return res
        .status(400)
        .json({ msg: "Only Pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();
    return res.status(200).json({ msg: "Order Cancelled Successfully", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = { placeOrder, getMyOrder, cancelOrder };
