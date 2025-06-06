import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home-bg">
      <div className="overlay">
        <div className="home-text text-center">
          <p className="welcome-message">Welcome to the Resource Management System</p>
          <div className="sing_in_up">
            <NavLink className="btn btn-primary text-decoration-none" to="/api/login">SIGN IN</NavLink>
            <NavLink className="btn btn-primary text-decoration-none" to="/api/signup">SIGN UP</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
