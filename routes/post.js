const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// const User = require("../model/user");
const Post = require("../model/post");


// implementing uploading feature
router.post("/", auth, async (req, res) => {
  const { title, photo } = req.body;
  const newPost = new Post({
    title,
    photo,
    postedBy: req.user,
  });
  try {
    const post = await newPost.save();
    res.status(200).json("uploaded");
    console.log(post);
  } catch (e) {
    console.log(e);
  }
});
// fetching user posts
router.get("/mypost", auth, (req, res) => {
  Post.find({ postedBy:req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});


// router.post("/userpost",(req, res) => {
//   Post.find({postedBy:req.body.id} )
//     .populate("postedBy","_id name")
//     .then((mypost) => {
//       res.json({ mypost });
    
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id username pic")
    .populate("comments.postedBy","_id username")
 
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

// removing post route
router.delete('/removepost',auth,(req,res)=>{
  Post.findByIdAndDelete(req.body.postId,{
      new:true
  })
  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})

// implement comment feature

router.put('/comment',auth,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id username")
    .populate("postedBy","_id username")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})



module.exports = router;