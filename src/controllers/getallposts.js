const mssql = require('mssql');
const config = require('../config/config');

async function getAllPosts(req, res) {
  try {
    const sql = await mssql.connect(config);
    if (sql.connected) {
      const query = `
        SELECT 
          P.Post_id, 
          P.Media_type, 
          P.Media_url, 
          P.Caption, 
          P.Posted_time, 
          U.UserName, 
          Pr.Profile_pic_url,
          COUNT(DISTINCT PL.PostLikes_id) AS PostLikes,
          COUNT(DISTINCT LC.LC_id) AS CommentLikes
        FROM Posts P
        INNER JOIN Users U ON P.user_Id = U.id
        INNER JOIN Profiles Pr ON P.user_Id = Pr.user_id
        LEFT JOIN PostLikes PL ON P.Post_id = PL.Post_id
        LEFT JOIN Comments C ON P.Post_id = C.Post_id
        LEFT JOIN Likes_Comment LC ON C.Comment_id = LC.Comment_id
        WHERE P.isDelete = 0
        GROUP BY P.Post_id, P.Media_type, P.Media_url, P.Caption, P.Posted_time, U.UserName, Pr.Profile_pic_url;
      `;
      const result = await sql.query(query);
      res.json(result.recordset);
    }
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllPosts
};
