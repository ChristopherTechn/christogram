import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/comment',
        {
          postId,
          commentText,
        },
        { withCredentials: true } 
      );

      // Handle successful comment submission
      console.log(response.data.message);
      setCommentText(''); // Clear the input field
      setError('');
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            rows="4"
            cols="50"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment here..."
            required
          />
        </div>
        <div>
          <button type="submit">Comment</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddComment;
