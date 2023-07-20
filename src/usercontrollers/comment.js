// backend/routes/posts.js

const express = require('express');
const router = express.Router();
const mssql = require('mssql');
const config = require('../config/config');

// Add comment to a post
async function getcomment(req, res) {
  try {
    const username = req.session.user; // Get the username from the session

    if (!username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId, commentText } = req.body;

    if (!postId || !commentText) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    // Fetch user ID from the Users table based on the username
    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);
    const getUserIdQuery = `
      SELECT id
      FROM Users
      WHERE UserName = @username;
    `;
    request.input('username', mssql.VarChar(255), username);
    const result = await request.query(getUserIdQuery);
    const userId = result.recordset[0].id;

    // Insert the comment into the Comments table
    const addCommentQuery = `
      INSERT INTO Comments (Post_id, user_Id, Comments)
      VALUES (@postId, @userId, @commentText);
    `;
    request.input('postId', mssql.UniqueIdentifier, postId);
    request.input('userId', mssql.UniqueIdentifier, userId);
    request.input('commentText', mssql.VarChar(255), commentText);
    await request.query(addCommentQuery);

    res.status(200).json({ message: 'Comment added successfully.' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = 
{
  getcomment
};
