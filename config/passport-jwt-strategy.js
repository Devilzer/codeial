const passpost = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial",
};

passpost.use(
  new JWTstrategy(opts, (jwtPayLoad, done) => {
    User.findById(jwtPayLoad._id, (err, user) => {
      if (err) {
        console.log("error in finding user JWT");
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passpost;
