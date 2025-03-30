import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Landing_Page from "./Components/Landing_Page/Landing_Page.jsx";
import SignUp from "./Components/Sign_Up/SignUp.jsx";
import Login from "./Components/Login/Login.jsx";
import InstantConsultation from "./Components/Instant_Consultation/InstantConsultation.jsx";
import Notification from "./Components/Notification/Notification.jsx"; // Import Notification component

// Placeholder for FindDoctors component
const FindDoctors = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Find Doctors</h2>
      <p>This is a placeholder for the Find Doctors page.</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification> {/* Include Notification component */}
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/search/doctors" element={<FindDoctors />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;