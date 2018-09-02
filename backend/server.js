const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const session = require('express-session')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');


/**
 * util 
 */

const verifyToken = require('./util/verifyToken.js');

/**
 * Create Express server.
 */
const app = express();
/**
 * cors middleware
 */
app.use(cors())



app.set('port', process.env.PORT || 3000);

/**
 * Connect to MongoDB.
 */
mongoose.connect("mongodb://admin:admin04@ds143081.mlab.com:43081/mean_db", { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *passport middleware 
 */
app.use(session({ secret: process.env.secret, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: '143277648213-v1hf7heni540man3puml4eab5p9uc7n3.apps.googleusercontent.com',
  clientSecret: 'RI_OA2NxsvL8sZkvkM2otdhT',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (req, accessToken, refreshToken, profile, done) {
    //return done(null,profile);
    User.findOne({ 'social.google.id': profile.id }, function (err, user) {
      if (err)
        return done(err);

      if (user) {

        // if a user is found, log them in
        return done(null, user);
      } else {
        // if the user isnt in our database, create a new user
        var newUser = new User();

        // set all of the relevant information
        newUser.social.google.id = profile.id;
        newUser.social.google.token = accessToken;
        newUser.social.google.name = profile.displayName;
        newUser.social.google.email = profile.emails[0].value; // pull the first email

        // save the user
        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  }
));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.post('/register', userController.register);
app.post('/login', userController.login);

/**
 * google authorization route
 */
app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/**
 * authorized route
 */
app.get('/userDetails', verifyToken, userController.userDetails);



/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;