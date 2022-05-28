const router = require("express").Router();
const Post = require("../models/post-model");

// middleware
const authCheck = (req, res, next) => {
  // Check the user is authenticated or not
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

// profile home page route
router.get("/", authCheck, async (req, res) => {
  // Find existing posts.
  let foundPosts = await Post.find({ author: req.user._id });

  res.render("profile", { user: req.user, posts: foundPosts });
});

// new post route - GET
router.get("/post", authCheck, (req, res) => [
  res.render("post", { user: req.user }),
]);

// new post route - POST
router.post("/post", authCheck, async (req, res) => {
  // Destruct title and content from req.body
  let { title, content } = req.body;

  // Create new post
  let newPost = await Post({ title, content, author: req.user._id });

  try {
    // Save newPost to database.
    await newPost.save();

    // Set status code as 200 (success) and redirect profile home page.
    res.status(200).redirect("/profile");
  } catch {
    console.log(err);
  }
});

module.exports = router;
