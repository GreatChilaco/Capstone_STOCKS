import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleRegistration = async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                console.log('Registration successful, User ID:', data.id);
                // Optionally do something with data.user_id here
                navigate('/Portfolio'); // Navigate to the portfolio page
            } else {
                // If there was a problem with the registration
                const errorData = await response.json();
                setError(errorData.error); // Assuming the error message is in the 'error' field
            }
        } catch (error) {
            console.error('Registration request failed:', error);
            setError('Registration request failed. Please try again.');
        }
    };

    return (
        <div className="registration-container">
            <h1>Register for STONKS</h1>
            {error && <div className="registration-error">{error}</div>}
            <form className="registration-form" onSubmit={handleRegistration}>
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
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
