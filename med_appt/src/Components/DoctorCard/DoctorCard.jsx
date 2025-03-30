import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({
  name,
  speciality,
  experience,
  rating,
  careerProfile,
  profilePic,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '' });

  useEffect(() => {
    // Fetch logged-in user data from localStorage or API
    const loggedUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
    if (loggedUser) {
      setUserData({ name: loggedUser.name, phone: loggedUser.phone });
    }
  }, []);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = { id: uuidv4(), ...appointmentData, ...userData };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      {/* Doctor Details Section */}
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
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-rating">Ratings: {rating}</div>
          {careerProfile && (
            <div className="doctor-card-career-profile">{careerProfile}</div>
          )}
        </div>
      </div>

      {/* Booking Button */}
      <div>
        <button className="book-appointment-btn" onClick={handleBooking}>
          <div>Book Appointment</div>
          <div>No Booking Fee</div>
        </button>
      </div>

      {/* Popup with Appointment Form */}
      <div className="doctor-card-options-container">
        <Popup
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
          contentStyle={{ padding: '20px' }}
        >
          {(close) => (
            <div className="appointment-form-wrapper">
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                userData={userData} // Pass user data to the form
                onSubmit={handleFormSubmit}
              />
              <button onClick={close}>Close</button>
            </div>
          )}
        </Popup>
      </div>

      {/* Appointments List */}
      {appointments.length > 0 && (
        <div className="appointments-list">
          <h3>Booked Appointments:</h3>
          {appointments.map((appointment) => (
            <div className="bookedInfo" key={appointment.id}>
              <p>Name: {appointment.name}</p>
              <p>Phone: {appointment.phone}</p>
              <p>Date: {appointment.appointmentDate}</p>
              <p>Time: {appointment.timeSlot}</p>
              <button
                className="cancel-appointment-btn"
                onClick={() => handleCancel(appointment.id)}
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorCard;