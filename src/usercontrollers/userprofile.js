const mssql = require('mssql');
const config = require('../config/config');

// const isAuthenticated = (req, res, next) => {
//   const sessionUsername = req.session.user;

async function getUserPosts(req, res) {
    try {
      const username = req.session.user; // Assuming the username is stored in the session
  
      if (!username) {
        return res.status(401).send('Unauthorized');
      }
    

    const sql = await mssql.connect(config);
    const request = new mssql.Request(sql);

    // Query to get user profile information
    const userProfileQuery = `
      SELECT UserName, Bio, Profile_pic_url
      FROM Users U
      LEFT JOIN Profiles P ON U.id = P.user_id
      WHERE UserName = @username;
    `;
    request.input('username', mssql.VarChar(255), username);
    const userProfileResult = await request.query(userProfileQuery);
    const userProfile = userProfileResult.recordset[0];

    // Query to get user posts and their associated comments and replies
    const userPostsQuery = `
      SELECT 
        P.Post_id, P.Caption, P.Posted_time, P.Media_url, 
        COUNT(PL.Post_id) AS PostLikes,
        COUNT(C.Comment_id) AS Comments,
        COUNT(LC.Comment_id) AS CommentLikes
      FROM Posts P
      LEFT JOIN PostLikes PL ON P.Post_id = PL.Post_id
      LEFT JOIN Comments C ON P.Post_id = C.Post_id
      LEFT JOIN Likes_Comment LC ON C.Comment_id = LC.Comment_id
      WHERE P.user_Id = (SELECT id FROM Users WHERE UserName = @username)
      GROUP BY P.Post_id, P.Caption, P.Posted_time,Media_url;
    `;
    const userPostsResult = await request.query(userPostsQuery);
    const userPosts = userPostsResult.recordset;

    // Query to get comments on user's posts and their associated replies
    const commentsQuery = `
    SELECT
    C.Comment_id,
    C.Comments AS CommentText,
    C.CommentTime,
    COUNT(LC.Comment_id) AS CommentLikes,
    COUNT(R.Reply_id) AS Replies,
    R.Replies AS ReplyText,
    R.ReplyTime,
    P.Media_url AS PostMediaUrl,
    P.Caption AS PostCaption
  FROM Comments C
  LEFT JOIN Likes_Comment LC ON C.Comment_id = LC.Comment_id
  LEFT JOIN Reply R ON C.Comment_id = R.Comment_id
  LEFT JOIN Posts P ON C.Post_id = P.Post_id
  WHERE C.user_Id = (SELECT id FROM Users WHERE UserName = @username)
  GROUP BY C.Comment_id, C.Comments, C.CommentTime, R.Reply_id, R.Replies, R.ReplyTime, P.Media_url, P.Caption;
  
    `;
    const commentsResult = await request.query(commentsQuery);
    const comments = commentsResult.recordset;

    // Query to get the number of followers for the user
    const followersQuery = `
      SELECT COUNT(*) AS Followers
      FROM Followers
      WHERE Follow_Id = (SELECT id FROM Users WHERE UserName = @username);
    `;
    const followersResult = await request.query(followersQuery);
    const followersCount = followersResult.recordset[0].Followers;

    // Query to get the number of notifications for the user
    const notificationsQuery = `
      SELECT COUNT(*) AS Notifications
      FROM Notifications
      WHERE user_Id = (SELECT id FROM Users WHERE UserName = @username);
    `;
    const notificationsResult = await request.query(notificationsQuery);
    const notificationsCount = notificationsResult.recordset[0].Notifications;

    const userProfileData = {
      ...userProfile,
      posts: userPosts,
      comments,
      followers: followersCount,
      notifications: notificationsCount,
    };

    res.status(200).json(userProfileData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {getUserPosts};
