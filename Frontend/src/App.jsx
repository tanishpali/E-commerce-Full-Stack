import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import LoginModal from "./Components/LoginModal";
import SignupModal from "./Components/SignupModal";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  return (
    <>
      <BrowserRouter>
        <Navbar openLogin={openLoginModal} />

        {showLoginModal && (
          <LoginModal
            closeModal={closeLoginModal}
            openSignupModal={() => {
              closeLoginModal();
              openSignupModal();
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            closeModal={closeSignupModal}
            openLoginModal={() => {
              closeSignupModal();
              openLoginModal();
            }}
          />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
