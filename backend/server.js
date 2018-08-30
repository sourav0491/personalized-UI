const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

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
 * Primary app routes.
 */
app.get('/', homeController.index);
app.post('/register', userController.register);
app.post('/login', userController.login);

/**
 * authorized route
 */
app.post('/userDetails', verifyToken, userController.userDetails);



/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;