const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../model/user');


router.post('/',async(req,res)=>{
    const {username,email,password}=req.body;
const newUser=new User({
username,email,password
})
try{
    const exsitedUser=await User.findOne({email});
    if(!exsitedUser){
        const salt=await bcrypt.genSalt(12);
        newUser.password=await bcrypt.hash(newUser.password,salt);
        const user=await newUser.save()
        res.status(200).send('user registered');

    }else{
        res.status(401).send('user already registered');
    }
}
catch(e){
console.log(e)
}
const exsitedUser=await User.findOne({email})


})

module.exports=router;