import React, { useState, useEffect } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch logged-in user data from localStorage
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setName(loggedUser.name || '');
      setPhoneNumber(loggedUser.phone || '');
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !phoneNumber || !appointmentDate || !timeSlot) {
      setError('Please fill out all fields.');
      return;
    }

    // Validate date (cannot be in the past)
    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError('Please choose a future date.');
      return;
    }

    setError('');

    // Appointment data to send
    const appointmentData = {
      name,
      phoneNumber,
      appointmentDate,
      timeSlot,
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Appointment successfully booked!');
        
        // Clear form fields after successful submission
        setAppointmentDate('');
        setTimeSlot('');

        // Pass appointment details to parent component
        onSubmit({ ...appointmentData, id: data.id });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create appointment.');
      }
    } catch (err) {
      setError('An error occurred while creating the appointment.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h2>
        Book Appointment with {doctorName} ({doctorSpeciality})
      </h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="timeSlot">Time Slot:</label>
        <select
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        >
          <option value="">Select Time Slot</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
        </select>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
