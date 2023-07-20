import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>#<i>MY SPACE</i></h1>
      <div>
        <h1>@{userProfile.username}</h1>
        <img src={userProfile.profilePicUrl} alt="anonymous" />
        {/* <p>Profile Picture: {userProfile.profilePicUrl}</p> */}
       <div className="bioprofile">
       <p>Bio: {userProfile.bio}</p>
       </div>
     <div className="followersprofile">
     <p>Followers: {userProfile.followersCount}</p>

     </div>
     <div className="postprofile">
     <p>Posts: {userProfile.postsCount}</p>

     </div>
     <div className="notificationsprofile">
     <p>Notifications: {userProfile.notificationsCount}</p>

     </div>
      </div>
    </div>
  );
};

export default UserProfile;
