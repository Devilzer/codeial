const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const cpmmentEmailWorker = require("../workers/comment_email_worker");
module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email").execPopulate();
      // commentsMailer.newComment(comment);
      let job = queue.create("emails", comment).save((err) => {
        if (err) {
          console.log("error in sendind to the queue", err);
          return;
        }
        console.log("job enqueued", job.id);
      });

      req.flash("info", "Comment added!");
      return res.redirect("/");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

//comment delete function
module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("warning", "Comment deleted!");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
