import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ openLogin }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyShop</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </li>
        <li>
          <Link to="/orders">My Orders</Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser />
          </Link>
        </li>

        <li>
          {token ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <button onClick={openLogin} className="login-btn">
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
