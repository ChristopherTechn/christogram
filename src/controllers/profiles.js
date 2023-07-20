
const config = require('../config/config.js');
const mssql = require('mssql')
require('dotenv').config();




async function Profiles(req, res) {
  try {
    const profiles = req.body;

    const sql = await mssql.connect(config);

    if (sql.connected) {
      const request = new mssql.Request(sql);
      const UserName = req.session.user.user

      request
        .input('UserName', profiles.UserName)  // Assuming `user_id` corresponds to `UserName` in the Users table
        .input('Bio', profiles.Bio)
        .input('Profile_pic_url', profiles.Profile_pic_url);

      const results = await request.execute('dbo.UpdateUserBio');
  
      const successMessage = `${profiles.UserName}! You have successfully updated your profile.`;
      console.log('Profile updated successfully:', profiles.UserName);
      res.status(200).json({ message: successMessage, username: profiles.UserName });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the profile.');
  }
}

module.exports = {
  Profiles
};


