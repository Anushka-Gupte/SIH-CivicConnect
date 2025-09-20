import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import ReportForm from './components/reportform';
import Dashboard from './components/dashboard';
import MapView from './components/mapview';
import './App.css';
import heroImage from './assets/hero-section.png'; // ✅ Make sure this image exists

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <div className="home active">
                <div className="hero-section">
                  <img src={heroImage} alt="Civic Engagement" className="hero-img" />
                </div>
              </div>
            }
          />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

