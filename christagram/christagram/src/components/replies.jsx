import React, { useState } from 'react';
import axios from 'axios';

const ReplyForm = ({ commentId }) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/Reply',
        {
          commentId,
          replyText,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Reply added successfully, do something (e.g., show a success message)
        console.log(response.data.message);
        // Reset the reply text
        setReplyText('');
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error adding reply:', error);
    }
  };

  return (
    <form onSubmit={handleReplySubmit}>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply here..."
        required
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default ReplyForm;
