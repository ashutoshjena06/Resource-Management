// ProfileCard.jsx
import React from "react";

export const ProfileCard = ({ profileData, photoSrc, onEdit, onView }) => {
  const fullName = `${profileData.firstName} ${profileData.lastName}`;

  return (
    <div className="card text-center p-4 shadow">
      <img
        src={photoSrc}
        alt="Profile"
        className="rounded-circle mx-auto"
        width="150"
        height="150"
      />
      <h3 className="mt-3">{fullName}</h3>
      <p className="text-muted">{profileData.email}</p>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={onEdit}>
          Edit Profile
        </button>
        <button className="btn btn-outline-secondary" onClick={onView}>
          View Profile
        </button>
      </div>
    </div>
  );
};
