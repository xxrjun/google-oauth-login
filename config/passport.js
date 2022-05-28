const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");

// Get id from user's data, that id will be stored in session.
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    console.log("Serializing user now.");

    // _id: 前面加一條底線會讓 mongodb 將每筆資料自動產生出一個 id.
    done(null, user._id);
  });
});

// Use user id to get user's data
passport.deserializeUser((_id, done) => {
  process.nextTick(() => {
    console.log("Deserializing user now.");

    User.findById({ _id }).then((user) => {
      console.log("Found user.");
      done(null, user);
    });
  });
});

// Use google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    // verify callback
    function verify(accessToken, refreshToken, profile, done) {
      console.log(profile);
      // Check whether the user already exists in our database.
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          // User already exists in our database.
          console.log("User already exists!");

          // Call callback function providing a user to complete authentication.
          done(null, foundUser);
        } else {
          // User is not in our database. Create a new user.
          new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("Create a new user successfully!");
              done(null, newUser);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  )
);
