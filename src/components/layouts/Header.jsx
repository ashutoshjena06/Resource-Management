import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="container-fluid bg-dark text-white d-flex align-items-center position-relative"
    style={{height:"80px"}}
    >
      <div className="position-absolute start-0 ms-3 "><NavLink className="text-decoration-none text-warning fs-4" to="/api/Home"><small cl>Raagvitech</small></NavLink></div>
      <div className="w-100 text-center">
        <h2 className="m-0 fw-bold">Resource Management System </h2>
        </div>
       
       
    </header>
  );
};
