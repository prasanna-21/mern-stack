const {check,validationResult}=require("express-validator")
const User=require("../models/Users")
const gravatar=require('gravatar');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');
const request=require('request');
const Profile=require("../models/Profile");
const Post=require('../models/Post')

const userController=async (req,res)=>{
    // console.log(req.body);
    // const {name,email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {name,email,password}=req.body;
    try{
        const emailExist = await User.findOne({email});

        if(emailExist) return res.status(400).send("email is already available");

        const avatar=gravatar.url({
            s:"200",
            r:"jpg",
            d:"mm"

        });
        let user=new User({
            name,
            email,
            password,
            avatar
        });
        const salt=await bcrypt.genSalt(12);

        user.password=await bcrypt.hash(password,salt);
        await user.save();
        const token=jwt.sign({_id:user._id},config.get('jwt_secrete'),{ expiresIn:'30d'});
        res.json({token});

        res.status(200).send("user successfully registered")

        }catch(err){
            res.status(400).send("bad request")
        }
   
    

}

const authController=async (req,res)=>{
    try{
        const user=await User.findById(req.id).select('-password');

        res.json({user})
    }catch(err){
        res.status(500).send("server error")
    }
}

const authPostController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if(!user)  return res.status(400).send("email is not avaiable in database");

        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword) return res.status(400).send("password does not match");

        const token=jwt.sign({_id:user._id},config.get('jwt_secrete'),{ expiresIn:'30d'});

        res.json({token});

    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
}

const getProfileController=async (req,res)=>{
    try{
        console.log("hello")
        const profile=await Profile.findOne({user:req.id});
        console.log(profile)
        if(!profile) return res.status(400).send("user porfile not found");

        res.json(profile)


    }catch(err){
        res.status(500).send("server error");
    }
}

const postProfileController=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({erros:errors.array()});

    //destructure request
    const {company,
            website,
            location,
            bio,
            status,
            githubuser,
            skills,
            youtube,
            instagram,
            linkedin,
            facebook,
            twitter,
            ...rest}=req.body;

    //build profile fields
    const profileFields={};
    profileFields.user=req.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubuser) profileFields.githubuser=githubuser;
    if(skills) profileFields.skills=skills.split(",").map(skill=>skill.trim());

    //build profile social object

    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(instagram) profileFields.social.instagram=instagram;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(facebook) profileFields.social.facebook=facebook;
    if(twitter) profileFields.social.twitter=twitter;
    //   build experience array

    try{
        let profile=await Profile.findOne({user:req.id});

        if(profile){
            //update
            profile=await Profile.findOneAndUpdate({user:req.id},{$set:profileFields},{new:true});

            res.json(profile)
        }
        //if not profile then create
        profile=new Profile(profileFields);

        await profile.save();

    }catch(err){
        res.status(500).send("server error");
    }

}

const getAllProfiles=async (req,res)=>{
    try{
        console.log("profile")
        const profiles=await Profile.find().populate("user",['name','avatar']).exec();
        // await profiles.populate("user").execPopulate();
        // console.log(profiles)
        res.json(profiles)
    }catch(err){
        res.status(500).send("server error");
    }
}
const getUserProfile=async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.params.user_id});
        if(!profile) return res.satus(400).send("user profile not found");

        res.json(profile)
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
}
//remove profile and user based on user id
const removeProfileController=async(req,res)=>{
    try{
    await Profile.findOneAndRemove({user:req.id})
    //remove user
    await User.findOneAndRemove({_id:req.id});
    res.send("user deleted")
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
}
const addProfileExpController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

    const {title,
            company,
            location,
            from,
            to,
            current,
            description}=req.body;
    const newExperience={
            title,
            company,
            location,
            from,
            to,
            current,
            description
    };
    try{
        const profile=await Profile.findOne({user:req.id}).populate('user',['name','avatar']).exec();
        if(!profile) return res.status(400).send("user profile not found")
        profile.experience.unshift(newExperience);
        await profile.save();

        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }

}
const removeProfileExpController=async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.id});

        const expIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(expIndex,1);

        await profile.save()
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
}
const getGithubController=(req,res)=>{
    try{
        const options={
            uri:`http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("git_client_id")}&client_secret=${config.get('git_client_secrete')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        }
        request(options,(err,response,body)=>{
            if(err) console.error(err);
            if(response.statusCode!==200)
            return res.status(404).send("no github profile found");
             res.json(JSON.parse(body));
        })

    }catch(err){
        res.status(500).send("server error")
    }
}

const addPostsController=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()) 
      return res.status(400).json({errors:errors.array()});
    try{
      const user=await User.findById(req.id);

      const newPost={
          user:req.id,
          text:req.body.text,
          name:user.name,
          avatar:user.avatar
      };

      const post=new Post(newPost);
      await post.save();
      res.json(post)
    }catch(err){
        res.status(500).send("server error")
    }
}
const getAllPost=async(req,res)=>{
    try{
        const posts=await Post.find();

        if(!posts) return res.satus(400).send("post not found")

        res.json(posts)

    }catch(err){
        res.status(500).send("server error")
    }
}
const getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id);

        if(!post) return res.status(400).send("post not found");
        res.json(post);

    }catch(err){
        console.log(err.message)
        if(err.kind==="ObjectId")
            return res.status(400).send("post not found");
        res.status(500).send("server error")
    }
}
const removePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id)
        if(!post) return res.status(400).send("post not found");
        //check user
        if(post.user.toString()!==req.id){
            return res.satus(401).json({msg:"user not authorized"})
        }
        await post.remove();
        res.json({msg:"post deleted"});

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
}
const likePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id);
        const likePost=post.likes.some(like=>like.user.toString()===req.id);
        if(likePost) return res.status(400).json({msg:" user like this post already"});

        post.likes.unshift({user:req.id});
        await post.save();
        res.json(post.likes)
    }catch(err){
        res.status(500).send("server error")
    }
}

const unlikePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id);
        if(!post) return res.status(400).send("post not found")
        const unlikePost=post.likes.filter(like=>like.user.toString()===req.id)
        if(unlikePost.length===0)
         return res.status(400).json({msg:"post not yet been like"})

         const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.id);

         post.likes.splice(removeIndex,1);
         await post.save();

        res.json(post.likes);
    }catch(err){
        console.log(err.message)
        if(err.kind==="ObjectId") 
          return res.status(400).send("post not found")
        res.status(500).send("server error")
    }
}
//add comments to post
const addComment=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    try{
        const post=await Post.findById(req.params.post_id);
        const user=await User.findById(req.id);
        if(!post || !user) return res.status(400).json({msg:"no authorization"})

        const newComment={
            user:req.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        };
        post.comments.unshift(newComment);
        await post.save();

        res.json(post.comments);


    }catch(err){
        if(err.kind=='ObjectId')
            return res.status(400).send("no authorization")
        res.status(500).send("server error");

    }
}
const removeComment=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id);
        // const user=await User.findById(req.id);

        const comment= post.comments.find(comment=>comment.id===req.params.comment_id);
        //comment not exist
        if(!comment) return res.status(404).send("comment does not exist");
        //user comment not exist
        if(comment.user.toString()!==req.id)
         return res.status(401).send("no user found for this comment");


        const commentArr=post.comments.map(comment=>comment.id.toString());
        const commentIndex=commentArr.indexOf(req.params.comment_id);

        post.comments.splice(commentIndex,1);
         await post.save();
         res.json(post.comments);


    }catch(err){
        console.log(err.message);
        if(err.kind=="ObjectId")
            return res.status(400).json({msg:"no authorization"})
        res.status(500).send("server error")
    }
}
module.exports={
    userController,
    authController,
    authPostController,
    getProfileController,
    postProfileController,
    getAllProfiles,
    getUserProfile,
    removeProfileController,
    addProfileExpController,
    removeProfileExpController,
    getGithubController,
    addPostsController,
    getAllPost,
    getPost,
    removePost,
    likePost,
    unlikePost,
    addComment,
    removeComment
}