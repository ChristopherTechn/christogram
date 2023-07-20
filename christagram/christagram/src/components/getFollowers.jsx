import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ username, isFollowing, updateFollowers }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/Follow', {
        usernameToFollow: username,
      }, {
        withCredentials: true,
      });
      setLoading(false);
      updateFollowers(true);
    } catch (error) {
      console.error('Error following user:', error);
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/Unfollow', {
        usernameToUnfollow: username,
      }, {
        withCredentials: true,
      });
      setLoading(false);
      updateFollowers(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      setLoading(false);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
