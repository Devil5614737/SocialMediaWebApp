const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    username: {
        type: String,
        maxlength: 22,
        minlength: 5,
      },
      email: {
        type: String,
        maxlength: 2222,
        minlength: 5,
      },
      password: {
        type: String,
        maxlength: 2222,
        minlength: 5,
      },
      pic:{
          type:String,
          default:"https://images.unsplash.com/photo-1642789256793-6fd9ece7ba0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
  
      },
      friends:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
});



userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    return token
  }



const User=mongoose.model("User",userSchema);

module.exports = User;