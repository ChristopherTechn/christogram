const mssql = require("mssql");
const config = require("../config/config");

async function notifications(req, res) {
    try {
        const username = req.session.user; 
    
        if (!username) {
          return res.status(401).send('Unauthorized');
        }


    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);

    const query = `
      EXEC ReadNotifications @UserName = @username;
    `;
    request.input("username", mssql.VarChar(255), username);
    const result = await request.query(query);
    const notifications = result.recordset;

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  notifications,
};
