const config = require('../config/config.js');
const mssql = require('mssql');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");

const session = require('express-session');

async function loginUser(req, res) {
  try {
    const { UserName, Password } = req.body;
    const sql = await mssql.connect(config);

    if (sql.connected) {
      const getUserQuery = `SELECT * FROM Users WHERE UserName = '${UserName}'`;
      const result = await sql.query(getUserQuery);

      if (result.recordset.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      const user = result.recordset[0];

      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {

        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // const sessionId = uuidv4();

      // req.session.sessionId = sessionId;
      // req.session.userId = user.id;
      // req.session.UserName = user.UserName;
      else{req.session.authorized = true;
      req.session.user = UserName;
           req.session.userId = user.id;
        
          
      return res.status(200).json({ message: 'Login successful.' ,results:req.session});
    }}
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the login request.');
  }
}

module.exports = {
  loginUser
};
