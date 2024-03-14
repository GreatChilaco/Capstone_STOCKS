import React, { useState } from 'react';
import './LandingPage.css'; 

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', username, password);
  };

  const handleRegisterClick = () => {
    console.log('Go to registration page');
  };

  return (
    <div className="login-container">
      <h1>Welcome to the Stock Tracker</h1>
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
        <button type="button" id="register-btn" onClick={handleRegisterClick}>
          Register here
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
