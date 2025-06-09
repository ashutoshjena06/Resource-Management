import React from "react";
import "./loader.css"; // Optional styling

export const Loader = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-4">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      ></div>
      <div className="mt-2 text-primary fw-semibold">Loading...</div>
    </div>
  );
};
