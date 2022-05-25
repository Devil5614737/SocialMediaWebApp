const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password,
  });

  try{
    const user = await User.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(newUser.password, user.password);
  
      if (validPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.status(200).json(token);
      } else {
        res.status(400).json("Invalid credentials");
      }
    } else if (!user) {
      res.status(400).json("Invalid credentials");
    }
  }
  catch(e){
      console.log(e)
  }
  
});

module.exports = router;