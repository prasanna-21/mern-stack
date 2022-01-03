const express=require("express");
const router=express.Router();
const {userController,authController,authPostController,getProfileController,postProfileController,getAllProfiles,getUserProfile,removeProfileController,addProfileExpController,removeProfileExpController,getGithubController,addPostsController,getAllPost,getPost,removePost,likePost,unlikePost,addComment,removeComment}=require("../controllers/auth")
const {check,validationResult}=require("express-validator")
const auth=require('../middleware/auth');

router.post("/users",[
    check('name','Name is required').not().isEmpty(),
    check('email',"please enter valid email").isEmail(),
    check('password',"please enter min 3 characters").isLength({min:3,max:32})
],userController)
// router.get("/posts",(req,res)=>{
//     res.send("posts route")
// })

router.get("/auth",auth,authController);
router.post("/auth",[check('email',"please enter valid email").isEmail(),
check('password',"password is required").exists()],authPostController)


//get login user profile
router.get("/profile/me",auth,getProfileController)

//create and update login profile user
router.post("/profile",
                [auth,
                check('status',"status is required").not().isEmpty(),
                check('skills',"skills  are required").not().isEmpty()],
                postProfileController);

router.get("/profile",getAllProfiles)

//get profile for user id
router.get("/user/:user_id",getUserProfile);

router.delete('/profile',auth,removeProfileController);

router.put("/profile/experience",
                            [auth,
                            check('title',"title is required").not().isEmpty(),
                            check('company','company is required').not().isEmpty(),
                        check('from','from is required').not().isEmpty()],addProfileExpController);
router.delete("/profile/experience/:exp_id",auth,removeProfileExpController);

router.get("/profile/github/:username",getGithubController);

router.post('/posts',[auth,
                      check('text',"text is required").not().isEmpty()
                    ],
                    addPostsController);
router.get('/posts',auth,getAllPost);

router.get('/posts/:post_id',auth,getPost);
router.delete('/posts/:post_id',auth,removePost)

//like post on post id
router.put('/posts/:post_id',auth,likePost);
//unlike post
router.put('/posts/unlike/:post_id',auth,unlikePost)
//add comment
router.post('/posts/comment/:post_id',[auth,
                            check('text','text is required').not().isEmpty()],addComment);
//remove comment
router.delete("/posts/comment/:post_id/:comment_id",auth,removeComment)

module.exports=router;