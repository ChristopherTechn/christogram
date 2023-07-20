import React, { useState, useEffect } from 'react';
import axios from 'axios';
import joker from '../images/joker.jpg';
import smiley from '../images/smiley.jpeg';
import comment from '../images/comment.jpg';
import smile from '../images/smile.png';
import AddComment from '../components/comments';
import ReplyForm from './replies';
import Postlike from './likepost';
import LikeComment from '../components/likescomment';
import FollowButton from '../components/getFollowers';



const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Posts', {
          withCredentials: true,
        });
        setPosts(response.data);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLikePost = async (postId) => {
    try {
      await axios.post(
        "http://localhost:5000/like",

        { UserName: "your_username", PosterUserName: "post_owner_username" },
        {
          withCredentials: true,
        }
      );
      console.log("Post liked successfully!");
 
      // fetchPosts();
    } catch (error) {
      console.error("Error while liking post:", error);
    }
  };


  const updateFollowers = (isFollowing) => {
    setIsFollowing(isFollowing);
    // Optionally, you can update other components or data after following/unfollowing
  };
  
  // Inside the map function of posts
  <img
    src={smiley}
    alt="smiley"
    onClick={() => handleLikePost(post.id)}
  />;
  

  return (
    <div className="post-list">
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* <Postlike key={post.Post_id} post={post} /> */}
          
            <div className="cont">
              <div className='user'>
          
                <h2>@{post.UserName}</h2>
                <FollowButton username={post.UserName} isFollowing={isFollowing} updateFollowers={updateFollowers} />
      
            <img src={post.Profile_pic_url} alt="" />

              </div>
              <div className="poster">
                <p>Caption: {post.Caption}</p>
                <img src={post.Media_url} alt="" />
              </div>
              <div className="lowerpic">
                <p>@: {post.Posted_time}</p>
                <div className="smiley" onClick={() => handleLikePost(post.id)}>
                  {/* <p>click me to like</p> */}
                  <img src={comment} alt="smiley" />
                </div>
                <p className="likes">{post.PostLikes} Likes</p>
              </div>
              <div className="tweets">

                <p>@tweets {post.Comments}</p>
                <p>{post.CommentsArray}</p>
                <div className="com">
                <div key={comment.commentId}>
                <Postlike key={post.Post_id} post={post} />

          <p>{comment.text}</p>
          <ReplyForm commentId={post.Comment_id} />
          <LikeComment Comment_Id={post.Comment_id} post={post} />


          </div>
         
          {post.Comment_id}
                  <img src={comment} alt="comment" />
                  <AddComment postId={post.Post_id} />
               
                </div>
                {/* <p>Comment Time: {post.CommentTime}</p> */}
               {/* {post.Reply_id} */}
                <p>@Replies: {post.Replies}</p>
                <p className="likes">{post.CommentLikes} Likes</p>
               
                {/* <LikeComment commentId={post.Comment_id} comment ={comment} /> */}
                {/* <p>Reply Time: {post.ReplyTime}</p> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
