const config = require('../../../posts/src/config/config.js');
const mssql = require('mssql');
require('dotenv').config();

async function Likes(req, res) {
  try {
    // Get the username from the session (assuming it is stored in req.session.user)
    const username = req.session.user;

    if (!username) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { postId } = req.body;

    const pool = await mssql.connect(config);

    if (pool.connected) {
      // Check if the post exists and belongs to the user
      const postResult = await pool
        .request()
        .input('postId', mssql.UniqueIdentifier, postId)
        .input('userName', mssql.VarChar(255), username)
        .query('SELECT TOP 1 p.user_Id FROM Posts p JOIN Users u ON p.user_Id = u.id WHERE p.Post_id = @postId AND u.UserName = @userName');

      const postExists = postResult.recordset.length > 0;

      // if (!postExists) {
      //   return res.status(404).json({ error: 'Post not found or does not belong to the user' });
      // }

      const request = pool.request();

      // Get the userId of the liker
      const userResult = await request
        .input('userName', mssql.VarChar(255), username)
        .query('SELECT id FROM Users WHERE UserName = @userName');

      const userId = userResult.recordset[0].id;

      // Insert the like record into the PostLikes table
      await request
        .input('userId', mssql.UniqueIdentifier, userId)
        .input('postId', mssql.UniqueIdentifier, postId)
        .query('INSERT INTO PostLikes (user_Id, Post_id) VALUES (@userId, @postId)');

      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'An error occurred while liking the post' });
  }
}
module.exports = {
  Likes
};
