import React, { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  // Sample user data
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(userDetails);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(updatedDetails);
    setEditMode(false);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-card">
      {editMode ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              disabled
              className="form-input"
            />
          </label>
          <button type="submit" className="form-button">
            Save
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <h1 className="profile-title">Welcome, {userDetails.name}</h1>
          <p className="profile-info">
            <b>Email:</b> {userDetails.email}
          </p>
          <p className="profile-info">
            <b>Phone:</b> {userDetails.phone}
          </p>
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;