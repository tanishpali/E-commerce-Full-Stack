import React, { useState } from "react";
import { signupUser } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";

const SignupModal = ({ closeModal, openLoginModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    address: "",
    gender: "",
    age: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(formData);
      toast.success(res.data.msg);
      closeModal();
      openLoginModal();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Signup Failed");
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <span className="auth-close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>Signup To MyShop</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="contact"
            placeholder="Enter Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
          />
          <button type="submit">Signup</button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <span
            onClick={() => {
              closeModal();
              openLoginModal();
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
