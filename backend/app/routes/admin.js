const router = require('express').Router();
const Admin = require('../models/Admin');
const authenticateToken = require('../middlewares/auth')

router.get('/requests', authenticateToken, async(req, res)=>{
    try{
        
        const admin = await Admin.findOne({email: req.email});

        if(!admin){
            return res.status(401).json({message:'Authentication failed'})
        }

        for(i in admin.requests){
            delete admin.requests[i].password
        }
        
        return res.status(200).json(admin.requests)


    }catch(err){
        return res.status(500).json({message: err})
    }
})

module.exports = router;


// GET ALL POSTS
router.get("/",async(req,res) => {
    const username = req.query.user;
    const category = req.query.category;
    const newPosts = req.query.new;
    try{
        let posts;
        if(username){
            posts= await Post.find({username}).sort( { "createdAt": -1 } )
        }else if(category){
            posts = await Post.find({category:{
                $in:[category]
            }}).sort( { "createdAt": -1 } )
        }else if(newPosts){
            posts = await Post.find().sort( { "createdAt": -1 } ).limit(3);
        }else{
            posts = await Post.find().sort( { "updatedAt": -1 } );
        }
        res.status(200).json(posts)

    }catch(error){
        res.status(500).json(error)
    }
})