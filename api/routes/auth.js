const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

require("dotenv").config();
// const AccessToken = require("./token/token");

//register

router.post("/auth/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//login

router.post("/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong USERNAME!");
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("wrong PASSWORD!");

    // const { password, ...others } = user._doc;
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.tokenKey,
      { expiresIn: "365d" }
    );
    // const token = AccessToken(user);
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//verify token
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.tokenKey, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

//update post
router.put("/posts/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // if (post.username === req.body.username) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
    // } else {
    //   res.status(401).json("you can only update your post!");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
