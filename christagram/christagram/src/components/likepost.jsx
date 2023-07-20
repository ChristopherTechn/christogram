import React, { useState } from 'react';
import axios from 'axios';

const Postlike = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      // Make a POST request to the server to like the post
      await axios.post('http://localhost:5000/Likes', {
        postId: post.Post_id,
       
      }, {
        withCredentials: true,
      },);

      // Update the state to indicate that the post has been liked
      setLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <img src={post.Media_url} alt="Post" />

      {/* Display the like button or heart icon */}
      {liked ? (
        <span role="img" aria-label="Liked">❤️</span>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}

      {/* Display other post information here */}
      <p>{post.Caption}</p>
      {/* ... other post details ... */}
    </div>
  );
};

export default Postlike;


