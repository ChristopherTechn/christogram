const mssql = require('mssql');
const config = require('../config/config');

async function getUserBio(req, res) {
  try {
    const username = req.session.user; // Assuming the username is stored in the session

    if (!username) {
      return res.status(401).send('Unauthorized');
    }

    await mssql.connect(config);
    const request = new mssql.Request();
    const query = `
    SELECT Bio, Profile_pic_url
      FROM Profiles
      
      WHERE user_id IN (
        SELECT id FROM Users WHERE UserName = @username
      );
    `;
    request.input('username', mssql.VarChar(255), username);

    const result = await request.query(query);
    if (result.recordset.length === 0) {
      return res.status(404).send('User not found');
    }

    const { Bio } = result.recordset[0];
    res.json({ bio: Bio });
  } catch (error) {
    console.error('Error retrieving user bio:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getUserBio
};
