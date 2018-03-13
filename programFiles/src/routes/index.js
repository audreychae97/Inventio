var express = require('express');
//const db = require('../../db'); figure out how to make this global
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;


// Needed to get datatables  to run
var jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
var jquery = require('jquery');

var $ = require('jquery');
require('datatables.net-bs4')($);
// End datatables reqs.


/* GET home page. */
router.get('/', function (req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated())
  res.render('mainpage', { title: 'Home' });
});

router.get('/mainpage', function (req, res, next) {
  res.render('mainpage', { title: 'Home' });
});

router.get('/profile', authenticationMiddleware(), function (req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/addproduct', authenticationMiddleware(), function (req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    res.render('addproduct', {
      productTable: results
    });
  });
});

router.post('/addproduct', function (req, res, next) {
  const db = require('../../db');

  var prodName = req.body.inputName;
  var quantity = req.body.quantityID;
  var category = 1;//req.body.selectCategory;;
  var size = req.body.sizeID;
  var unit = req.body.selectUnit;
  var desc = req.body.descriptionID;
  var wholesalePr = req.body.wholesaleID;
  var retailPr = req.body.retailID;

  console.log(unit);
  db.query('INSERT INTO product (name, quantity, categoryID, size, unit, description, wholesalePrice, retailPrice)' +
    'VALUES (?, ?, ?, ?,?, ?, ?, ?)', [prodName, quantity, category, size, unit, desc, wholesalePr, retailPr],
    function (error, results, fileds) {
      if (error) throw error;
      console.log("submitted");
  });

  //Using the same query from addproduct get method. This is bad, need to reuse the method, so
  //need to figure our how to move the queries to another .js file or something because this is varry varry
  //bad practice, plus messy and hard to follow. But I wanted to get it to work so i just have it here fo now
  // /rant
  console.log("###################################################################");
  console.log("###################################################################");
  console.log("###################################################################");
  console.log("########  DOING A BAD THING HERE! Read comment in index.js#  ######");
  console.log("###################################################################");
  console.log("###################################################################");
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    res.render('addproduct', {
      productTable: results
    });
    console.log("After get??");
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});


//method that retrieves information for one product by ID
//TODO: separate the searching of a certain product by ID into a separate method and pass into this .get as 2nd param..

router.get('/createOrder/:productID', function (req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM product WHERE ProductID = ?', req.params.productID, function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
    res.json(results[0]);
    //res.send(results[0]);
  });
});
/////////////////////////////////////////////////////////////
// All method for create order page, each function is a query
function getProducts(req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    req.productTable = results;
    return next();
  });
}

function getClients(req, res, next){
  const db = require('../../db');
  db.query('SELECT * FROM client', function (error, results, fields) {
    if (error) throw error;
    req.clientTable = results;
    return next();
  });
}

function renderCreateOrderPage(req, res){
  res.render('createorder', {
    productTable: req.productTable,
    clientTable: req.clientTable
  });
}

// The get call to create order
router.get('/createorder', getProducts, getClients, renderCreateOrderPage);
// End of methods for create order
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// All methods required for inventory
function renderInventoryPage(req, res){
  res.render('inventory', {
    productTable: req.productTable
  });
}

router.get('/inventory', getProducts, renderInventoryPage);
// End of method for inventory page
/////////////////////////////////////////////////////////////





  // res.render('createorder', { title: 'Create Order' });


// router.get('/createorder', function (req, res, next) {

//   const db = require('../../db');
//   var resultsYO;
//   db.query('SELECT * FROM product', function (error, results, fields) {
//     if (error) throw error;
//     resultsYO = results;

//     res.render('createorder', {
//       productTable: resultsYO
//     });
//     next();
//   });
//   // console.log(resultsYO);
//   console.log("Session: %j", resultsYO);
// });

router.get('/logout', function (req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Registration' });
});

console.log('Start');

router.post('/register', function (req, res, next) {

  req.checkBody('username', 'Username field connot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long , please try again').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  //req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*\d)(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,"i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long').len(8, 100);
  req.checkBody('passwordMatch', 'Password does not match, please try again').equals(req.body.password);

  const errors = req.validationErrors();
  // if errors occur in the registration page, run this register page again
  if (errors) {
    console.log('if statement');
    console.log('errors: ${JSON.stringify(errors)}');
    res.render('register', { title: 'Registration Error', errors: errors });
  }
  else {
    console.log('else statement');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const db = require('../../db.js');
    // bcrypt hashes the password and saves them in the database
    bcrypt.hash(password, saltRounds, function (err, hash) {
      db.query('INSERT INTO users(username, email, password) VALUES(?,?,?)', [username, email, hash],
        function (error, results, fields) {
          if (error) throw error;
          db.query('SELECT LAST_INSERT_ID() as user_id', function (error, results, fields) {
            if (error) throw error;

            var user_id = results[0];
            console.log(user_id);
            req.login(user_id, function (error) {
              res.redirect('/');
            })
          });
        })
    });
  }
});

// allows the user to access certain sites in the website
passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
  }
}
module.exports = router;
