
const mssql = require('mssql');
const config = require("../config/config");


async function GetFollowers(req, res) {

  try {
    const { usernameToFollow } = req.body;
    const followerUsername = req.session.user;

    if (!followerUsername) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const pool = await mssql.connect(config);

    // Check if the follower and user to follow exist
    const followerResult = await pool
      .request()
      .input('followerUsername', mssql.VarChar(255), followerUsername)
      .query('SELECT id FROM Users WHERE UserName = @followerUsername');

    const userToFollowResult = await pool
      .request()
      .input('usernameToFollow', mssql.VarChar(255), usernameToFollow)
      .query('SELECT id FROM Users WHERE UserName = @usernameToFollow');

    const followerId = followerResult.recordset[0]?.id;
    const userToFollowId = userToFollowResult.recordset[0]?.id;

    if (!followerId || !userToFollowId) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the follow relationship already exists
    const followResult = await pool
      .request()
      .input('followerId', mssql.UniqueIdentifier, followerId)
      .input('userToFollowId', mssql.UniqueIdentifier, userToFollowId)
      .query('SELECT COUNT(*) AS count FROM Followers WHERE Follower_Id = @followerId AND Follow_Id = @userToFollowId');

    const followCount = followResult.recordset[0]?.count;

    if (followCount > 0) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Add the follow relationship
    await pool
      .request()
      .input('followerId', mssql.UniqueIdentifier, followerId)
      .input('userToFollowId', mssql.UniqueIdentifier, userToFollowId)
      .query('INSERT INTO Followers (Follower_Id, Follow_Id) VALUES (@followerId, @userToFollowId)');

    res.status(200).json({ message: `You are now following ${usernameToFollow}` });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'An error occurred while trying to follow the user' });
  }
};


async function Unfollow(req, res) {

  try {
    const { usernameToUnfollow } = req.body;
    const followerUsername = req.session.user;

    if (!followerUsername) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const pool = await mssql.connect(config);

    // Check if the follower and user to unfollow exist
    const followerResult = await pool
      .request()
      .input('followerUsername', mssql.VarChar(255), followerUsername)
      .query('SELECT id FROM Users WHERE UserName = @followerUsername');

    const userToUnfollowResult = await pool
      .request()
      .input('usernameToUnfollow', mssql.VarChar(255), usernameToUnfollow)
      .query('SELECT id FROM Users WHERE UserName = @usernameToUnfollow');

    const followerId = followerResult.recordset[0]?.id;
    const userToUnfollowId = userToUnfollowResult.recordset[0]?.id;

    if (!followerId || !userToUnfollowId) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the follow relationship exists
    const followResult = await pool
      .request()
      .input('followerId', mssql.UniqueIdentifier, followerId)
      .input('userToUnfollowId', mssql.UniqueIdentifier, userToUnfollowId)
      .query('SELECT COUNT(*) AS count FROM Followers WHERE Follower_Id = @followerId AND Follow_Id = @userToUnfollowId');

    const followCount = followResult.recordset[0]?.count;

    if (followCount === 0) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    // Remove the follow relationship
    await pool
      .request()
      .input('followerId', mssql.UniqueIdentifier, followerId)
      .input('userToUnfollowId', mssql.UniqueIdentifier, userToUnfollowId)
      .query('DELETE FROM Followers WHERE Follower_Id = @followerId AND Follow_Id = @userToUnfollowId');

    res.status(200).json({ message: `You have unfollowed ${usernameToUnfollow}` });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'An error occurred while trying to unfollow the user' });
  }
}
async function followers(req, res) {
  try {
    const username = req.session.user;

    if (!username) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const pool = await mssql.connect(config);

    // Get the logged-in user's ID
    const userResult = await pool
      .request()
      .input('username', mssql.VarChar(255), username)
      .query('SELECT id FROM Users WHERE UserName = @username');

    const userId = userResult.recordset[0]?.id;

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the list of followers for the logged-in user who are not unfollowed (UnFollow = 0) along with their profile info
    const followersResult = await pool
      .request()
      .input('userId', mssql.UniqueIdentifier, userId)
      .query(`
        SELECT F.Follower_Id, U.UserName, P.Bio, P.Profile_pic_url
        FROM Followers F
        JOIN Users U ON F.Follower_Id = U.id
        JOIN Profiles P ON F.Follower_Id = P.user_id
        WHERE F.Follow_Id = @userId AND F.UnFollow = 0
      `);

    const followersData = followersResult.recordset;
    res.status(200).json({ followers: followersData });
  } catch (error) {
    console.error('Error getting followers:', error);
    res.status(500).json({ error: 'An error occurred while trying to get followers' });
  }
}

  

module.exports ={

  Unfollow,
    GetFollowers,
    followers
}


