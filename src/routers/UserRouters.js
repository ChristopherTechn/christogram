const express = require('express')
const userRoutes = express.Router()

const {loginUser} = require('../usercontrollers/login')
const {RegisterUser} = require('../usercontrollers/newuser')
const {Logout} = require('../usercontrollers/logout')
const {DeleteAccount} = require('../usercontrollers/DeleteAccount')
const { postUserProfile } = require('../usercontrollers/postprofile')
const { createPost } = require('../usercontrollers/postpicture')
// const { Likes} = require('../usercontrollers/Likes')

const { getprofile} = require('../usercontrollers/getprofiles')
const { notifications} = require('../usercontrollers/readnotifications')
const { getUserPosts} = require('../usercontrollers/userprofile')
const { getcomment } = require('../usercontrollers/comment')
const {addReply } = require('../usercontrollers/replies')
const {Likes}  = require('../usercontrollers/Likes')
const {likeComment}  = require('../usercontrollers/commentlikes')
const {GetFollowers,Unfollow,followers} = require('../usercontrollers/GetFollowers')



userRoutes.post('/login', loginUser )
userRoutes.post('/newuser',  RegisterUser)
userRoutes.post('/Logout',  Logout)
userRoutes.post('/DeleteAccount',  DeleteAccount)
userRoutes.post('/Postprofile',postUserProfile)
userRoutes.post('/Post',createPost)
// userRoutes.post('/like',Likes)
userRoutes.get('/profile',getprofile)
userRoutes.get('/notifications',notifications)
userRoutes.get('/userposts',getUserPosts )
userRoutes.post('/comment',getcomment )
userRoutes.post('/Reply',addReply )
userRoutes.post('/Likes',Likes )
userRoutes.post('/Likescomment',likeComment )
userRoutes.post('/Follow',GetFollowers )
userRoutes.post('/Unfollow',Unfollow )
userRoutes.get('/followers',followers )









module.exports=
userRoutes;
