import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

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
    const newAppointment = { id: uuidv4(), ...appointmentData };
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
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
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
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <AppointmentFormIC
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
              />
              <button onClick={close}>Close</button>
            </div>
          )}
        </Popup>
      </div>
      
      {/* Optionally, render a list of booked appointments below */}
      {appointments.length > 0 && (
        <div className="appointments-list">
          <h3>Booked Appointments:</h3>
          {appointments.map((appointment) => (
            <div className="bookedInfo" key={appointment.id}>
              <p>Name: {appointment.patientName}</p>
              <p>Phone: {appointment.phoneNumber}</p>
              <p>Date: {appointment.appointmentDate}</p>
              <p>Time: {appointment.timeSlot}</p>
              <button onClick={() => handleCancel(appointment.id)}>
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorCardIC;