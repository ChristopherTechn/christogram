import React from 'react';
import axios from 'axios';

const LikeComment = ({ Comment_Id }) => {
  const handleLikeComment = async () => {
    try {
      await axios.post(
        'http://localhost:5000/Likescomment',
        {
          Comment_Id: Comment_Id,
        },
        {
          withCredentials: true,
        }
      );
      console.log('Comment liked successfully');
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div>
      <p>{/* Render comment content here */}</p>
      <button onClick={handleLikeComment}>Like</button>
    </div>
  );
};

export default LikeComment;
