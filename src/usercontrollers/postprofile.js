const mssql = require('mssql');
const config = require('../config/config');

async function postUserProfile(req, res) {
  try {
    const username = req.session.user; // Assuming the username is stored in the session

    if (!username) {
      return res.status(401).send('Unauthorized');
    }

    // const { media_type, media_url, caption } = req.body;

    // const sql = await mssql.connect(config);

    // if (sql.connected) {
    //   const request = new mssql.Request(sql);

    //   request.input('UserName', username);
    //   request.input('media_type', media_type);
    //   request.input('media_url', media_url);
    //   request.input('caption', caption);
    const { bio, Profile_pic_url } = req.body; // Assuming the bio and profile picture are sent in the request body

    await mssql.connect(config);
    const request = new mssql.Request();
    const query = `
      INSERT INTO Profiles (Profile_id, user_id, Bio, Profile_pic_url, UpdatedBioTime)
      VALUES (NEWID(), (SELECT id FROM Users WHERE UserName = @username), @bio, @Profile_pic_url, GETDATE());
    `;
    request.input('username', username);
    request.input('bio',  bio);
    request.input('Profile_Pic_url', Profile_pic_url);

    await request.query(query);

    res.status(201).send('Profile updated successfully');
  } catch (error) {
    console.error('Error posting user profile:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  postUserProfile
};
