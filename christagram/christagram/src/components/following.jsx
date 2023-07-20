import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Fetch the list of followers from the backend using axios
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/followers', {
          withCredentials: true,
        });
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };
    fetchFollowers();
  }, []);

  return (
    <div>
      <h1>Followers</h1>
      {followers.map((follower) => (
        <div key={follower.Follower_Id}>
          <p>{follower.UserName}</p>
          <p>{follower.Bio}</p>
          <img src={follower.Profile_pic_url} alt="Profile" />
        </div>
      ))}
    </div>
  );
};

export default FollowersList;
