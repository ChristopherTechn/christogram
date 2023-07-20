import { Link } from 'react-router-dom'; 
import profile from '../images/profile.jpeg'
function Home() {
    return(
<div className='all'>
      <h1>My profile</h1>
      
 

<div className='proimg'>
<img src={profile} alt="profile" />
</div>
   
<div className='data'>
  <div>
    <label>@Patricia</label>
    </div>
    <div>
    <label>Bio</label>
    </div>
      <div> <label>Posts</label></div>
     <div>
     <label>Followers</label>
     </div>
<Link to="/profile">Edit your profile here</Link>
</div>

</div>
    )
  }
  
  export default Home;
  

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//   const [bio, setBio] = useState('');
//   const [profilePic, setProfilePic] = useState('');

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/Bio', {
//         withCredentials: true, // Send the session cookie with the request
//       });

//       const { bio, profilePic } = response.data;
//       setBio(bio);
//       setProfilePic(profilePic);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Bio: {bio}</p>
//       {profilePic && <img src={profilePic} alt="Profile Picture" />}
//     </div>
//   );
// };

// export default UserProfile;
