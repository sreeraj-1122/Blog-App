const express = require('express');
const router = express.Router();
const registerFunction = require('../Controller/registerController');
const protect = require('../Middleware/Token');
const loginFunction = require('../Controller/loginController');
const createPost = require('../Controller/createPost');
const getAllpost = require('../Controller/getAllpost');
const multer = require('multer');
const getSinglepost = require('../Controller/getSinglepost');
const savePost = require('../Controller/savePosts');
const getUser = require('../Controller/getUser');
const getUserPost = require('../Controller/getUserpost');
const editPost = require('../Controller/editPost');
const deletePost = require('../Controller/deletePost');
const editUser = require('../Controller/editUser');
const uploadMiddleware = multer({ dest: 'uploads/' })

const middleware = [protect]; 

router.route('/register').post(registerFunction)
router.route('/login').post(loginFunction)
router.route('/create').post(middleware,uploadMiddleware.single("file"),createPost)
router.route('/post').get(getAllpost)
router.route('/post/:id').get(getSinglepost)  
router.route('/post/:postid').patch(savePost)
router.route('/user/:id').get(middleware,getUser)
router.route('/users/:userid').get(middleware,getUserPost)
router.route('/editpost/:id').put(uploadMiddleware.single("file"),editPost) 
router.route('/deletepost/:id').delete(middleware,deletePost) 
router.route('/edituser/:id').put(middleware,uploadMiddleware.single("profile"),editUser)   



module.exports=router; 