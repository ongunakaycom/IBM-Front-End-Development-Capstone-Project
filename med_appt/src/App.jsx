import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Landing_Page from "./Components/Landing_Page/Landing_Page.jsx";
import SignUp from "./Components/Sign_Up/SignUp.jsx";
import Login from "./Components/Login/Login.jsx";
import InstantConsultation from "./Components/Instant_Consultation/InstantConsultation.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/instant-consultation" element={<InstantConsultation />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;