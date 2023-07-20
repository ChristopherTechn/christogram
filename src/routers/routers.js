const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/getallfollowers')
const { getUserBio } = require('../controllers/getbio')
// const { getUserProfilePicture } = require('../controllers/getbio')
const { getAllPosts } = require('../controllers/getallposts')
const { postUserProfile } = require('../usercontrollers/postprofile')


router.get('/Users',getAllUsers)
router.get('/Bio',getUserBio)
router.get('/Posts',getAllPosts)
router.post('/Postprofile',postUserProfile)

// router.get('/Profilepicture',getUserProfilePicture)




module.exports = router;