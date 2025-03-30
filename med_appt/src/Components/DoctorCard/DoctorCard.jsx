import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({
  name,
  speciality,
  experience,
  rating,
  careerProfile,
  profilePic,
}) => {
  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={`${name}'s profile`} />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="46" 
              height="46" 
              fill="currentColor" 
              className="bi bi-person-fill" 
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          )}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-rating">Ratings: {rating}</div>
          {careerProfile && (
            <div className="doctor-card-career-profile">{careerProfile}</div>
          )}
        </div>
        {/* Step 6: Book Appointment Button */}
        <div>
          <button className="book-appointment-btn">
            <div>Book Appointment</div>
          </button>
        </div>
      </div>
      {/* Ignore any additional code between doctor-card-options-container tags */}
    </div>
  );
};

export default DoctorCard;