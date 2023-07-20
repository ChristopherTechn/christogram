import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleRequestPasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:8000/password-reset', {
        email,
      });
      setResetStatus(response.data.message);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setResetStatus('Error requesting password reset');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8000/password-reset/verify', {
        email,
        uniqueNumber,
        newPassword,
      });
      setResetStatus(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetStatus('Error resetting password');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      {resetStatus && <p>{resetStatus}</p>}
      {resetStatus === 'Password reset email sent' ? (
        <>
          <input
            type="text"
            placeholder="Unique Number"
            value={uniqueNumber}
            onChange={(e) => setUniqueNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      ) : (
        // <input
        //   type="email"
        //   placeholder="Email"
        //   value={email}
        //   onChange={(e) => setEmail(e.target.value)}
        // />
        <button onClick={handleRequestPasswordReset}>Request Password Reset</button>
      )}
    </div>
  );
};

export default PasswordReset;
