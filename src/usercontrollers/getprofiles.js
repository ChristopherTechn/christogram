
const mssql = require("mssql");
const config = require("../config/config");

async function getprofile(req, res) {
    try {
        const username = req.session.user; 
    
        if (!username) {
          return res.status(401).send('Unauthorized');
        }

    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);

    
    const profileQuery = `
      SELECT u.UserName, p.Profile_pic_url, p.Bio
      FROM Users u
      JOIN Profiles p ON u.id = p.user_id
      WHERE u.UserName = @username;
    `;
    request.input("username", mssql.VarChar(255), username);
    const profileResult = await request.query(profileQuery);
    const profile = profileResult.recordset[0];

    // Get number of followers
    const followersQuery = `
      SELECT COUNT(*) AS FollowersCount
      FROM Followers
      WHERE Follow_Id = (SELECT id FROM Users WHERE UserName = @username);
    `;
    const followersResult = await request.query(followersQuery);
    const followersCount = followersResult.recordset[0].FollowersCount;

    // Get number of posts
    const postsQuery = `
      SELECT COUNT(*) AS PostsCount
      FROM Posts
      WHERE user_Id = (SELECT id FROM Users WHERE UserName = @username);
    `;
    const postsResult = await request.query(postsQuery);
    const postsCount = postsResult.recordset[0].PostsCount;

    // Get number of notifications
    const notificationsQuery = `
      SELECT COUNT(*) AS NotificationsCount
      FROM Notifications
      WHERE user_Id = (SELECT id FROM Users WHERE UserName = @username) AND isDelete = 0;
    `;
    const notificationsResult = await request.query(notificationsQuery);
    const notificationsCount = notificationsResult.recordset[0].NotificationsCount;

    const userProfile = {
      username: profile.UserName,
      profilePicUrl: profile.Profile_pic_url,
      bio: profile.Bio,
      followersCount,
      postsCount,
      notificationsCount,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports={
    getprofile
}
