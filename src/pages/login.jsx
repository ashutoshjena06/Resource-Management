import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import axios from "axios";
import { useCookies } from "react-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [cookies,setCookies]=useCookies(["Email"]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', loginData);
      console.log("Login successful:", response);
      console.log("Login email:", response.data.user.email);
      if(response.status==200){
        setCookies("Email", loginData.email, { path: "/" });
        e.target.reset();
        if(response.data.user.email=='admin@gmail.com'){
          console.log("inside if ");
          navigate("/api/admindashboard");
        }
        else{
          console.log("inside else ");
          navigate("/api/dashboard");
        }
       
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="login-bg">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="newUser">
          <p>Forgot your password? <a href="/api/resetPassword">Reset it here</a></p>
        </div>
        <div className="newUser">
          <p>Don't have an account? <a href="/api/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};
