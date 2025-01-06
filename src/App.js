// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home';  // Import the Home component
import UserDetails from './UserDetail';

const Header = () =>{
  const navigate = useNavigate();
  return (
    <header className="App-header">
    <h1>Random Users</h1>
    <p>Explore a diverse set of random users from all over the world!</p>
    <div className="hero-section">
      <button onClick={() => navigate('/home')}>View Users</button>
    </div>
  </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-details/:username" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
