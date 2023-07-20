import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import phone from '../images/phone.jpg'
import tower from '../images/tower.webp'

const RegistrationForm = () => {

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [c_password, setC_Password] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password !== c_password) {
      console.log(alert(('Passwords do not match')))
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName,
          LastName,
          UserName,
          Email,
          Password,
          c_password
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setC_Password('');
        setError('');

        toast.success('Email sent for confirmation', {

          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // 3 seconds
        });

      } else {
        console.log(alert(data.error))
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  return (
<>
<div className='signup'>
<div className='phone'>
<img src={tower} alt="tower" />
</div>

    <div className="form">
    <h1>SIGN-UP</h1>
    
      {success && <p className="success-message">Registration successful! You can now log in.</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">

          <label htmlFor="firstName">First Name</label>

          <input
            type="text"
            id="FirstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

        </div>
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
          <label htmlFor="Email">Email</label>
          <input
            type="Email"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="Password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={c_password}
            onChange={(e) => setC_Password(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <p className="login-link">
        <h3>Already have an account? <Link to="/loginForm">Click here to login</Link></h3>
      </p>
      <ToastContainer position="top-center" autoClose={5000} />
      
    </div>
    </div>
    </>
  );
};
export default RegistrationForm;