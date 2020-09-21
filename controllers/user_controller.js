const User = require("../models/user");
const fs = require("fs");
const path = require("path");

//render profile page
module.exports.profile = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

// User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//   return res.redirect("back");
// });

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("***Multer Error*** ", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          //saving the path of uploaded file to avatar field in user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//render user signin page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "Codiel | SignIN",
  });
};

//render user sign up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("profile");
  }
  return res.render("user_sign_up", {
    title: "Codiel | SignUP",
  });
};

//sign up function
module.exports.createUser = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in creating user");
          return;
        }
        return res.redirect("sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in function
module.exports.createSession = (req, res) => {
  req.flash("success", "Signed In successfully");
  return res.redirect("/");
};
// sign-out function
module.exports.terminateSession = (req, res) => {
  req.logout();
  req.flash("success", "Signed Out successfully");
  return res.redirect("/");
};
