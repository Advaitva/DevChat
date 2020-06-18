const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const ValidatePostInput = require("../../validation/post");
const profile = require("../../validation/profile");

// @routes          GET /api/posts/demo
// @description     Testing Posts route
// @access          Public

router.get("/demo", (req, res) => res.json({ msg: "Posts Work" }));

// @routes          POST /api/posts/posts
// @description     Create a post
// @access          Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => {
      res.json(post);
    });
  }
);

// @routes          GET /api/posts/posts
// @description     Get all posts
// @access          Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch(() => res.status(404).json({ noPosts: "No posts found." }));
});

// @routes          GET /api/posts/:p_id
// @description     Get particular posts
// @access          Public

router.get("/:p_id", (req, res) => {
  Post.findById(req.params.p_id)
    .then((post) => res.json(post))
    .catch(() =>
      res.status(404).json({ noPost: "No post found with that id" })
    );
});

// @routes          POST /api/posts/like/:p_id
// @description     Like particular post
// @access          Private

router.post(
  "/like/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.p_id)
          .then((post) => {
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(401)
                .json({ alreadyLiked: "Post already liked." });
            } else {
              post.likes.unshift({ user: req.user.id });
              post.save().then((post) => res.json(post));
            }
          })
          .catch(() =>
            res.status(404).json({ noPost: "No post found with that id" })
          );
      })
      .catch(() =>
        res.status(401).json({ notAuthorized: "User not authorized" })
      );
  }
);

// @routes          POST /api/posts/unlike/:p_id
// @description     Unlike particular post
// @access          Private

router.post(
  "/unlike/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.p_id)
          .then((post) => {
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
            ) {
              const likeIndex = post.likes
                .map((item) => item.user.toString())
                .indexOf(req.user.id);
              post.likes.splice(likeIndex, 1);
              post.save().then((post) => res.json(post));
            } else return res.json({ notLiked: "Post not liked yet" });
          })
          .catch(() =>
            res.status(404).json({ noPost: "No post found with that id" })
          );
      })
      .catch(() =>
        res.status(401).json({ notAuthorized: "User not authorized" })
      );
  }
);

// @routes          DELETE /api/posts/:p_id
// @description     Delete particular post
// @access          Private

router.delete(
  "/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.p_id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(() =>
          res.status(404).json({ noPost: "No post found with that id" })
        );
    });
  }
);

// @routes          POST /api/posts/comment/:p_id
// @description     Add comment to particular post
// @access          Private

router.post(
  "/comment/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.p_id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch(() =>
        res.status(404).json({ noPost: "No post found by that id." })
      );
  }
);

// @routes          DELETE /api/posts/comment/:p_id/:comment_id
// @description     Delete comment for particular post
// @access          Private

router.delete(
  "/comment/:p_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.p_id).then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length > 0
        ) {
          const commentIndex = post.comments
            .map((item) => item.id.toString())
            .indexOf(req.params.comment_id);
          post.comments.splice(commentIndex, 1);
          post.save().then((post) => res.json(post));
        } else
          return res
            .status(404)
            .json({ noComment: "Comment not found for that comment id" });
      });
    });
  }
);

module.exports = router;
