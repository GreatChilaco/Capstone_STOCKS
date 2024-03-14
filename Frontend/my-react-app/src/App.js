import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Portfolio from './Portfolio'; // Adjust the path if necessary
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onLogin={() => console.log("CABBAGE")}/>} />
        <Route path="/Portfolio" element={<Portfolio />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
