import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/AdminDashboard';
import TrainerDashboard from './Components/TrainerDashboard';
import Profile from './Components/Profile';
import NotificationHistory from './Components/NotificationHistory';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<NotificationHistory />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
