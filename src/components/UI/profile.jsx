// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ProfileCard } from "./ProfileCard";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";

export const Profile = () => {
  const [cookies] = useCookies(["Email"]);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: "",
    address: "",
    phone: "",
  });

  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = cookies.Email;
        const response = await axios.get(
          `http://localhost:3000/api/getUsersByEmail/${email}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [cookies]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const email = cookies.Email;
      await axios.put(`http://localhost:3000/api/update/${email}`, profileData);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  const photoSrc =
    photoPreview || profileData.photo || "https://via.placeholder.com/150";

  return (
    <div className="container mt-5">
      {!editMode && !viewMode && (
        <ProfileCard
          profileData={profileData}
          photoSrc={photoSrc}
          onEdit={() => setEditMode(true)}
          onView={() => setViewMode(true)}
        />
      )}

      {viewMode && (
        <ProfileView
          profileData={profileData}
          photoSrc={photoSrc}
          onClose={() => setViewMode(false)}
        />
      )}

      {editMode && (
        <ProfileEdit
          profileData={profileData}
          photoPreview={photoPreview}
          onChange={handleChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleUpdate}
          onCancel={() => setEditMode(false)}
        />
      )}
    </div>
  );
};
