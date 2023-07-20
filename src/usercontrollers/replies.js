const mssql = require('mssql');
const config = require('../config/config');

async function addReply(req, res) {
  try {
    const { commentId, replyText } = req.body;
    const username = req.session.user; // Assuming the username is stored in the session

    if (!username || !commentId || !replyText) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);

    const userQuery = `
      SELECT id
      FROM Users
      WHERE UserName = @username;
    `;
    request.input('username', mssql.VarChar(255), username);
    const userResult = await request.query(userQuery);
    const userId = userResult.recordset[0].id;

    const replyQuery = `
      INSERT INTO Reply (user_Id, Comment_Id, Replies)
      VALUES (@userId, @commentId, @replyText);
    `;
    request.input('userId', mssql.UniqueIdentifier, userId);
    request.input('commentId', mssql.UniqueIdentifier, commentId);
    request.input('replyText', mssql.VarChar(255), replyText);
    await request.query(replyQuery);

    res.status(200).json({ message: 'Reply added successfully.' });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  addReply,
};
