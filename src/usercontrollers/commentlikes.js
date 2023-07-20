const mssql = require('mssql');
const config = require('../config/config');

async function likeComment(req, res) {
  try {
    const { commentId } = req.body;
    const username = req.session.user; // Assuming the username is stored in the session

    if (!username) {
      return res.status(401).send('Unauthorized');
    }

    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);

    // Get user ID based on the username
    const userIdQuery = `
      SELECT id FROM Users WHERE UserName = @username;
    `;
    request.input('username', mssql.VarChar(255), username);
    const userIdResult = await request.query(userIdQuery);
    const userId = userIdResult.recordset[0].id;

    // Check if the comment exists
    const commentQuery = `
      SELECT * FROM Comments WHERE Comment_id = @commentId;
    `;
    request.input('commentId', mssql.UniqueIdentifier, commentId);
    const commentResult = await request.query(commentQuery);
    const comment = commentResult.recordset[0];

    if (!comment) {
      return res.status(404).send('Comment not found');
    }

    // Insert the like into the Likes_Comment table
    const likeQuery = `
      INSERT INTO Likes_Comment (LC_id, user_Id, Comment_Id, LikesTime)
      VALUES (NEWID(), @userId, @commentId, GETDATE());
    `;
    request.input('userId', mssql.UniqueIdentifier, userId);
    await request.query(likeQuery);

    res.status(200).send('Comment liked successfully');
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  likeComment,
};
