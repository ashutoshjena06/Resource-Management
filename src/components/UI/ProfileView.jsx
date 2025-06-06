// ProfileView.jsx
import React from "react";

export const ProfileView = ({ profileData, photoSrc, onClose }) => {
  const fullName = `${profileData.firstName} ${profileData.lastName}`;

  return (
    <div className="card p-4 shadow">
      <h3>Profile Details</h3>
      <img
        src={photoSrc}
        alt="Profile"
        className="rounded mx-auto mb-3"
        width="120"
        height="120"
      />
      <p>
        <strong>Full Name:</strong> {fullName}
      </p>
      <p>
        <strong>Email:</strong> {profileData.email}
      </p>
      <p>
        <strong>Address:</strong> {profileData.address || "Not provided"}
      </p>
      <p>
        <strong>Phone:</strong> {profileData.phone || "Not provided"}
      </p>
      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
