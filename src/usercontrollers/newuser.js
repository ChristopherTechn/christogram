
const config = require('../config/config');
const mssql = require('mssql')
require('dotenv').config();
const bcrypt = require('bcrypt');
const RegisterSchema = require('../validators/register.js');
const sendMail = require('../utils/email.js');
const bodyParser = require('body-parser');


   async function RegisterUser(req, res){


    try {
      const { error, value } = RegisterSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    const users = req.body;
    const hashedPwd = await bcrypt.hash(users.Password, 8);
      const sql = await mssql.connect(config);

      const usernameExistsQuery = `SELECT COUNT(*) AS count FROM Users WHERE UserName = '${users.UserName}'`;
      const usernameExistsResult = await sql.query(usernameExistsQuery);

      if (usernameExistsResult.recordset[0].count > 0) {
        return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      }

      if (sql.connected) {
        const request = new mssql.Request(sql);

      //   req.session.authorized = true;
      // req.session.user = UserName;

        request
          .input('FirstName', users.FirstName)
          .input('LastName', users.LastName)
          .input('UserName', users.UserName)
          .input('Email', users.Email)
          .input('Password',hashedPwd)

        

        const results = await request.execute('dbo.addUsers');
  
        const registeredUserName = users.UserName;
        const successMessage = `${registeredUserName}!  You have successfully registered to Christagram. Welcome, `;
        console.log('User registered successfully:', registeredUserName);
        res.status(200).json({ message: successMessage, username: registeredUserName });
      
        sendMail(`${users.Email}`, "Sign in", `Dear ${users.UserName},\n\nThank you for registering with our service. We are delighted to inform you that your registration was successful! \
        n\nWe look forward to serving you and providing an excellent experience. If you have any questions or need assistance, please feel free to reach out.
        \n\nBest regards,\nCHRISTAGRAM`);
        

      }
    }
     catch(error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the user.');
    }
  }

module.exports ={
  RegisterUser
}
