import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userprofile = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data from the backend API
    const fetchUserProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userposts', {
          withCredentials: true, // Set this if you are using cookies for authentication
        });
        setUserProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfileData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfileData) {
    return <p>Error fetching user profile data.</p>;
  }

  const { UserName, Bio, Profile_pic_url, posts, comments, followers, notifications } = userProfileData;

  return (
    <div>
      <h1>Welcome, {UserName}!</h1>
      <div>
        <img src={Profile_pic_url} alt="Profile" />
        <p>Bio: {Bio}</p>
      </div>
      <div>
        <h2>Posts:</h2>
        {posts.map((post) => (
          <div key={post.Post_id}>
            <p>Caption: {post.Caption}</p>
            <img src={post.Media_url} alt="Post" />
            <p>Likes: {post.PostLikes}</p>
            <p>Comments: {post.Comments}</p>
            <p>Comment Likes: {post.CommentLikes}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Comments:</h2>
        {comments.map((comment) => (
          <div key={comment.Comment_id}>
            <p>Comment: {comment.CommentText}</p>
            <p>Comment Time: {comment.CommentTime}</p>
            <p>Likes: {comment.CommentLikes}</p>
            <p>Replies: {comment.Replies}</p>
            {comment.Replies.map((reply) => (
              <div key={reply.Reply_id}>
                <p>Reply: {reply.ReplyText}</p>
                <p>Reply Time: {reply.ReplyTime}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Followers: {followers}</p>
        <p>Notifications: {notifications}</p>
      </div>
    </div>
  );
};

export default Userprofile;
