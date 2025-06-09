import "./dashboard.css";
import { useCookies } from "react-cookie";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const AdminPage = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["Email"]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    removeCookies("Email", { path: "/" });
    navigate("/api/login");
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/api/admindashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-3 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/api/admindashboard/manageemployee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-3 bi-people ms-2"></i>
                  <span className="me ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="chat"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-chat-dots ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Chats</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/api/admindashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/api/admindashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleSubmit}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="col py-3"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
