import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation to registration
import { authManager } from '../config/firebase'; // Adjust the path as needed
import './Loginform.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const isRegistered = await authManager.isUserRegistered(email);
      if (!isRegistered) {
        alert('User not registered. Please sign up.');
        return;
      }

      await authManager.logInWithEmailAndPassword(email, password);
      alert('Login successful!');
      navigate('/explore'); // Redirect after successful login
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed: ' + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authManager.loginWithGoogle();
      alert('Google login successful!');
      navigate('/explore');
    } catch (err) {
      console.error('Google login failed:', err.message);
      alert('Google login failed: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </form>
      <p className="redirect-text">
        Don't have an account? <Link to="/register">Sign up here</Link>  {/* Link to registration */}
      </p>
    </div>
  );
};

export default LoginForm;
