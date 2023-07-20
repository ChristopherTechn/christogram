const mssql = require('mssql');
const config = require('../config/config');

async function createPost(req, res) {
  try {
    const username = req.session.user; // Assuming the username is stored in the session

    if (!username) {
      return res.status(401).send('Unauthorized');
    }

    const { media_type, media_url, caption } = req.body;

    const sql = await mssql.connect(config);

    if (sql.connected) {
      const request = new mssql.Request(sql);

      request.input('UserName', username);
      request.input('media_type', media_type);
      request.input('media_url', media_url);
      request.input('caption', caption);

      await request.execute('dbo.PostPic');

      const successMessage = `${username}! You have successfully created a post.`;
      console.log('Your post created successfully:', username);
      res.status(200).json({ message: successMessage, username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
}

module.exports = {
  createPost
};
