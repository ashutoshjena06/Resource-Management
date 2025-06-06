// ProfileEdit.jsx
import React from "react";

export const ProfileEdit = ({
  profileData,
  photoPreview,
  onChange,
  onPhotoChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="card p-4 shadow">
      <h3>Edit Profile</h3>
      <form onSubmit={onSubmit}>
        {["firstName", "lastName", "address", "phone"].map((field, idx) => (
          <div className="mb-3" key={idx}>
            <label className="form-label">
              {field.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={profileData[field]}
              onChange={onChange}
              required={field === "firstName" || field === "lastName"}
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={profileData.password || ""}
            onChange={onChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={onPhotoChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="mt-2 rounded"
              width="100"
              height="100"
            />
          )}
        </div>

        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
