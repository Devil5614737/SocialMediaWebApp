const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
});
// router.get("/profiles", async (req, res) => {
//   const user = await User.find().select("-password");
//   res.status(200).json(user);
// });

// router.post('/otherprofile',async(req,res)=>{
//   // const id=req.body;
//   const user=await User.findById(req.body.id).select('-password')
//   res.status(200).send(user)
// })

// update user profile pic
router.put("/updatepic", auth, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "not updated" });
      }
      res.json(result);
    }
  );
});

// update username
router.put("/updateusername", auth, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { username: req.body.username } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "not updated" });
      }
      res.json(result);
    }
  );
});

module.exports = router;
