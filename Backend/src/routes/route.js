const express = require("express");
const Route = express.Router();
const {
  addUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const {
  addProducts,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addToCart,
  getCart,
  updateCart,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartController");

const {
  placeOrder,
  getMyOrder,
  cancelOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// User
Route.post("/addUser", addUsers);
Route.get("/getAllUsers", authMiddleware, getUsers);
Route.put("/updateUser/:id", authMiddleware, updateUser);
Route.delete("/deleteUser/:id", authMiddleware, deleteUser);
Route.post("/login", loginUser);

// Products
Route.post("/addProducts", authMiddleware, addProducts);
Route.get("/getAllProducts", getAllProducts);
Route.get("/getProductById/:id", getProductById);
Route.get("/getProductsByQuery", getProductsByQuery);
Route.put("/updateProduct/:id", authMiddleware, updateProduct);
Route.delete("/deleteProduct/:id", authMiddleware, deleteProduct);

// Cart
Route.post("/addToCart", authMiddleware, addToCart);
Route.get("/getCart", authMiddleware, getCart);
Route.put("/updateCart", authMiddleware, updateCart);
Route.delete("/removeItem/:productId", authMiddleware, removeItemFromCart);
Route.delete("/clearCart", authMiddleware, clearCart);

// Order
Route.post("/placeOrder", authMiddleware, placeOrder);
Route.get("/getMyOrder", authMiddleware, getMyOrder);
Route.delete("/cancelOrder/:id", authMiddleware, cancelOrder);

module.exports = Route;
