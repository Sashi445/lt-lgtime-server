const router = require("express").Router();

const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("./../middlewares/upload");

// POST - post for a given user
router.post("", upload.single("image"), async (req, res) => {
  const { filename } = req.file;

  const { _id: userid } = req.user;

  console.log(req.body);

  try {
    const user = await User.findById(userid);

    const { postContent, latitude, longitude } = req.body;

    const newPost = new Post({
      postedBy: user,
      postContent,
      latitude,
      longitude,
      image: `/uploads/${filename}`,
    });

    await newPost.save();

    return res.json(newPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500);
  }
});

// GET all posts of logged in user
router.get("", async (req, res) => {
  const { _id: userid } = req.user;
  try {
    const user = await User.findById(userid);
    const posts = await Post.find({
      postedBy: user,
    }).sort({ createdAt: -1 });

    return res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500);
  }
});

module.exports = router;
