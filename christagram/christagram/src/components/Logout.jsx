import React, { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post('http://localhost:5000/Logout'); // Replace '/logout' with your actual logout endpoint
        // Perform any additional logout-related tasks (e.g., clearing session data)
        console.log('Logged out successfully');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    handleLogout();
  }, []);

  return <button>Logout</button>; // Render your logout button here
};

export default Logout;
