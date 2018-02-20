var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
  router.get('/', function(req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated())
  res.render('mainpage', { title: 'Home' });
});

router.get('/mainpage', function(req, res, next) {
  res.render('mainpage', { title: 'Home' });
});


router.get('/profile', authenticationMiddleware(),function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

  console.log('count the times this executes!!!');

  router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Username field connot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4,15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long , please try again').len(4,100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8,100);
  //req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*\d)(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,"i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long').len(8,100);
  req.checkBody('passwordMatch', 'Password does not match, please try again').equals(req.body.password);

  const errors = req.validationErrors();
  // if errors occur in the registration page, run this register page again
  if(errors){
      console.log('if statement');
      console.log('errors: ${JSON.stringify(errors)}');
      res.render('register',{title: 'Registration Error', errors:errors});
  }
  else
  {
    console.log('else statement');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const db = require('../db.js');
    // bcrypt hashes the password and saves them in the database
    bcrypt.hash(password, saltRounds, function(err, hash) {
      db.query('INSERT INTO users(username, email, password) VALUES(?,?,?)',[username,email,hash],
      function(error,results,fields){
        if(error)throw error;
        db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results,fields){
          if(error) throw error;

          var user_id = results[0];
          console.log(user_id);
          req.login(user_id,function(error){
            res.redirect('/');
            })
          });
        })
      });
  }
});

// allows the user to access certain sites in the website
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

function authenticationMiddleware () {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}
module.exports = router;
