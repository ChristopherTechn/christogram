

import React, { useState, useEffect } from 'react';
import smile from '../images/smile.png';
import axios from 'axios';



const FollowersPage = () => {

  const [followersData, setFollowersData] = useState([]);
  useEffect(() => {
    fetchFollowersData();

  }, []);
  const fetchFollowersData = async () => {
    try {

      const response = await axios.get('http://localhost:8000/Posts', {
        withCredentials: true,
      });

      setFollowersData(response.data);

    } catch (error) {

      console.error(error);
    }

  };
  return (

    <div className="followers-page">

      <h1>Followers</h1>

      <div className="followers-list">

        {followersData.map((follower) => (

          <div className="follower-card" key={follower.UserID}>

            <div className="profile-image">

              <img src={follower.Profile_pic_url} alt={follower.UserName} />

            </div>

            <div className="card-content">

              <h2>{follower.UserName}</h2>

              <button className="follow-button" onClick={fetchFollowersData}>

                Follow

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );

};
export default FollowersPage;


