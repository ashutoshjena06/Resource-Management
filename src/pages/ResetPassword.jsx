import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const { email, firstName, newPassword } = userData;

    console.log("Reset Password:", { email, firstName, newPassword });

    try {
      const response = await axios.put(
        "http://localhost:3000/api/resetPassword",
        userData
      );
      console.log("Password reset successful:", response.data);
      navigate("/api/login");
    } catch (error) {
      console.error(
        "There was an error resetting the password:",
        error.response?.data?.message || error.message
      );
      alert(
        "Reset failed: " + (error.response?.data?.message || "Unknown error")
      );
    }

    event.target.reset();
  };

  return (
    <div className="reset-bg">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <div className="newUser">
          <p>
            <a href="/api/login">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
