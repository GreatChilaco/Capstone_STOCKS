import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Portfolio from './Portfolio'; 
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;


