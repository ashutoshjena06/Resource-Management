import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      e.target.reset();
      navigate("/api/login");
    } catch (error) {
      console.error(
        "There was an error signing up:",
        error.response?.data?.message || error.message
      );
      alert(
        "Signup failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="signup-bg">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="newUser">
          <p>
            Already have an account? <a href="/api/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
