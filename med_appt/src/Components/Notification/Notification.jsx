import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Import CSS for styling

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // Show notification when appointment data is available
    }
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
    localStorage.removeItem(doctorData?.name); // Remove appointment data on cancellation
  };

  return (
    <div>
      <Navbar></Navbar>
      {children}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <button className="notification-close" onClick={closeNotification}>
              &times;
            </button>
            <h3 className="notification-title">Appointment Notification</h3>
            <p className="notification-message">
              <strong>User:</strong> {username.split('@')[0]}
            </p>
            <p className="notification-message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="notification-message">
              <strong>Date:</strong> {appointmentData?.date}
            </p>
            <p className="notification-message">
              <strong>Time:</strong> {appointmentData?.time}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;