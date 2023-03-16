const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models").user;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // let loginUser = await User.findOne({})
      console.log(profile);
      done(null, profile);
    }
  )
);
module.exports = () => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      let foundUser = await User.findOne({ _id: jwt_payload._id });
      try {
        if (foundUser) {
          //done =>req.user =foundUser
          return done(null, foundUser);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
