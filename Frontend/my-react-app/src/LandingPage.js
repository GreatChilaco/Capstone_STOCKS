import React, { useState } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LandingPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log("hello")
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
console.log("HELLO2")
      if (response.ok) {
        console.log("HERE")
        const data = await response.json();
        console.log('Login successful:', data);
        //setUsername(data.username);
        //onLogin(); // Update the login state in the App component
        navigate('/Portfolio'); // Navigate to the portfolio route
        return data;
      } else {
        const errorData = await response.text();
        console.log(errorData);
        setError('Login failed: ' + errorData);
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setError('Login request failed. Please try again.');
    }
  };

  // Rest of your component's JSX
  return (
    <div className="login-container">
      <h1>Welcome to the STONKS</h1>
      {error && <div className="login-error">{error}</div>} {/* Display error message if any */}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LOGIN</button>
      </form>
      <div className="register-link">
    Don't have an account? <Link to="/register">Register here</Link>
  </div>
</div>
  );
};

export default LandingPage;