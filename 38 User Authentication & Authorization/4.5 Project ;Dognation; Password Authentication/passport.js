const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// 2. Set up the Passport strategy:
passport.use(new LocalStrategy(
  function(username, password, done) {
    // 3.
    helper.findByUsername(username, (err, user) => {
      // 4.
      if (err) return done(err);
      // 5.
      if (!user) return done(null, false);
      // 6.
      if (user.password != password) return done(null, false);
      // 7.
      return done(null, user);
    });
  })
);

// Serialize a user

// Deserialize a user
