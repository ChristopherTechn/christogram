
const config = require('../config/config.js');
const mssql = require('mssql')
require('dotenv').config();




async function DeleteAccount(req, res) {
  try {
    const Users = req.body;

    const sql = await mssql.connect(config);

    if (sql.connected) {
      const request = new mssql.Request(sql);

      request
        .input('UserName', Users.UserName)         

      const results = await request.execute('dbo.IsDeleteUser');
  
      const successMessage = `${Users.UserName}! You have successfully deleted your Christagram Account`;
      console.log('Account Deleted successfully:', Users.UserName);
      res.status(200).json({ message: successMessage, username: Users.UserName });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the profile.');
  }
}

module.exports = {
  DeleteAccount
};


