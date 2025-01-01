// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';  // Import the Home component
import UserDetails from './UserDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Random Users</h1>
          <p>Explore a diverse set of random users from all over the world!</p>
          <div className="hero-section">
            <button onClick={() => window.location.href = '/home'}>View Users</button>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
