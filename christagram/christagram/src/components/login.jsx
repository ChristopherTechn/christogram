import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../images/login.png';
import axios from 'axios';

const LoginForm = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        {
          UserName,
          Password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setUserName('');
        setPassword('');
        setError('');
        toast.success('Login successful!');
        console.log(alert('successfully logged in!'));
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="loginform">
      <div className="login">
        <img src={login} alt="phone" />
      </div>
      <div className="LOGIN">
        <h1>LOGIN</h1>
        {success && <p className="success-message">Login successful! You can now view all posts.</p>}
        {error && <p className="error-message">{error}</p>}
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="UserName">UserName</label>
            <input
              type="text"
              id="UserName"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="login-link">
          ForgotPassword<Link to="/PasswordReset">Forgot password</Link>
        </p>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};

export default LoginForm;
