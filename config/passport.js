const User = require('../models/user')
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
    console.log('Start of LocalStrategy');
      console.log('Finding User')
      const user = await User.findOne({ username: username});
      console.log(user)
      if (!user) {
        return done( null, false, { message: 'Incorrect username' });
      };

      const match = await bcrypt.compare(password, user.password);
      console.log(match)
      if (!match) {
        return done( null, false, { message: 'Incorrect password' });
      }

      return done(null, user);

    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

}