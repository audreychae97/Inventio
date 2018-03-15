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
  if (req.isAuthenticated()){ //if already logged into a session, show different home screen
    res.render('loginHome', {title: 'Welcome'});
  }
  else{
    res.render('mainpage', { title: 'Home' });
  }
});

// --------------- GET method for rendering the mainPage ---------------------
router.get('/mainpage', function (req, res, next) {
  if (req.isAuthenticated()){ //if already logged into a session, show different home screen
    res.render('loginHome', {title: 'Welcome'});
  }
  else{ //if there is no active session, load the default home page that allows for logging in
    res.render('mainpage', { title: 'Home' });
  }
});
// --------------- GET method for rendering the profile page -------------------
router.get('/profile', authenticationMiddleware(), function (req, res, next) {
  res.render('profile', { title: 'Profile' });
});
// --------------- GET method for rendering the add product page----------------
router.get('/addproduct', authenticationMiddleware(), function (req, res, next) {
  const db = require('../../db'); //database set from app.js
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    res.render('addproduct', {
      productTable: results
    });
  });
});
// --------------- POST method for adding in new product ---------------------
router.post('/addproduct', function (req, res, next) {
  const db = require('../../db');
  //grab the data from the text fields from the UI.
  var prodName = req.body.inputName; //request -> parameter -> body's inputName field
  var quantity = req.body.quantityID;
  var category = req.body.selectCategory;
  var size = req.body.sizeID;
  var unit = req.body.selectUnit;
  var desc = req.body.descriptionID;
  var wholesalePr = req.body.wholesaleID;
  var retailPr = req.body.retailID;

  db.query('INSERT INTO product (Name, size, unit, category, quantity, description, wholesalePrice, retailPrice)' +
    'VALUES (?, ?, ?, ?,?, ?, ?, ?)', [prodName, size, unit, category, quantity, desc, wholesalePr, retailPr],
    function (error, results, fileds) {
      if (error) throw error;
      console.log("submitted");
  });

//TODO Implement Nick's rant
  //Using the same query from addproduct get method. This is bad, need to reuse the method, so
  //need to figure our how to move the queries to another .js file or something because this is varry varry
  //bad practice, plus messy and hard to follow. But I wanted to get it to work so i just have it here fo now
  // /rant
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    res.render('addproduct', {
      productTable: results
    });
    console.log("After get??");
  });
});

// --------------- POST method for adding a new client ---------------------
router.post('/addclient', function (req, res, next) {
  const db = require('../../db');
  var storeName = req.body.storeName;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phoneNumber = req.body.phoneNumber;
  var streetAddress = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zipCode = req.body.zipCode;

  //query to input new client information to database
  db.query('INSERT INTO client (StoreName, FirstName, LastName, PhoneNumber, StreetAddress, City, State, ZipCode)' +
    'VALUES (?, ?, ?, ?,?, ?, ?, ?)', [storeName, firstName, lastName, phoneNumber, streetAddress, city, state, zipCode],
    function (error, results, fileds) {
      if (error) throw error;
      res.redirect('addclient');
  });
});

// --------------- GET method for rendering the finances page ---------------------
router.get('/finances', function (req, res, next) {
  res.render('finances', { title: 'Finances' });
});
// router.get('/order', function(req,res,next){
//   res.render('order', {title: 'Orders'});
// });
// --------------- GET method for rendering the login page ---------------------
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});
// --------------- GET method for rendering the about page ---------------------
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});

// --------------- GET method for rendering the addClient ---------------------
router.get('/addclient', function (req, res, next) {
  res.render('addclient', { title: 'Add Client' });
});

//method that retrieves information for one product by ID
//TODO: separate the searching of a certain product by ID into a separate method and pass into this .get as 2nd param..

// --------------- GET method for retrieving product information for a single product
router.get('/createOrder/:productID', function (req, res, next) {
  const db = require('../../db');
  //bind variable to the parameter's value of product ID...
  db.query('SELECT * FROM product WHERE ProductID = ?', req.params.productID, function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
    res.json(results[0]);
  });
});
/////////////////////////////////////////////////////////////
// All method for create order page, each function is a query

// --------------- Function for retrieving all products from table -------------
// --------------- GET method for retrieving product information for a single product
router.get('/order/:orderID', function (req, res, next) {
  const db = require('../../db');
  //bind variable to the parameter's value of product ID...
  db.query('SELECT * FROM order_info WHERE OrderID = ?', req.params.orderID, function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
    res.json(results[0]);
  });
});

function getProductsByID(req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM product WHERE productID = ?', req.params.productID, function (error, results, fields) {
    if (error) throw error;
    req.productTable = results;
    return next();
  });
}
function getOrders(req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM order_info', function (error, results, fields) {
    if (error) throw error;
    req.ordersTable = results;
    return next();
  });
}
// --------------- Function that rendors the order page with the populated productTable
function renderOrdersPage(req, res){
  res.render('order', {
    ordersTable: req.ordersTable
  });
}
router.get('/order', getOrders, renderOrdersPage, getProductsByID);
// --------------- Function for retrieving all products from table -------------
function getProducts(req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    req.productTable = results;
    return next();
  });
}
// --------------- Function for retrieving all clients in DB--------------------
function getClients(req, res, next){
  const db = require('../../db');
  db.query('SELECT * FROM client', function (error, results, fields) {
    if (error) throw error;
    req.clientTable = results;
    return next();
  });
}
// --------------- function for retrieving the summation of inventory's expenses
function getInventory(req, res, next){
  const db = require('../../db');
  db.query('SELECT SUM(WholesalePrice * Quantity) FROM product', function (error, results, fields) {
    if (error) throw error;
    res.render('finances',{
      results:results
    });
      console.log(results);
    return next();
  });
}
// --------------- Rendering the createOrder page ---------------------
function renderCreateOrderPage(req, res){
  res.render('createorder', {
    productTable: req.productTable, //provide the pages with tables to populate data
    clientTable: req.clientTable
  });
}

// --------------- GET method for creating an order calls the above declared functions
router.get('/createorder', getProducts, getClients, renderCreateOrderPage);
// End of methods for create order
/////////////////////////////////////////////////////////////

// --------------- Function that rendors the inventory page with the populated productTable
function renderInventoryPage(req, res){
  res.render('inventory', {
    productTable: req.productTable
  });
}
// --------------- PUT method for incrementing inventory of a product---------------------
// Accepts: the new quantity amount and productID to know which product to increment
router.put('/inventory/increment/:quantityAmount/:productID', function(req, res, next){
  const db = require('../../db');
  db.query(`UPDATE product SET quantity = (quantity + ?) WHERE productID = ?`,[req.params.quantityAmount,req.params.productID], function (error, results, fields) {
    if (error) throw error;
  });
});

// --------------- PUT method for decrementing inventory of a product---------------------
// Accepts: the new quantity amount and productID to know which product to decrement
router.put('/inventory/decrement/:quantityAmount/:productID', function(req, res, next){
  const db = require('../../db');
  db.query(`UPDATE product SET quantity = (quantity - ?) WHERE productID = ?`,[req.params.quantityAmount,req.params.productID], function (error, results, fields) {
    if (error) throw error;
  });
});
router.get('/inventory', getProducts, renderInventoryPage);
// End of method for inventory page
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// All methods required for inventory

// --------------- Function for retreiving all clients ---------------------
function getClients(req, res, next) {
  const db = require('../../db');
  db.query('SELECT * FROM client', function (error, results, fields) {
    if (error) throw error;
    req.clientTable = results;
    return next();
  });
}
// --------------- Function for rendering the client table---------------------
function renderClientPage(req, res){
  res.render('clientlist', {
    clientTable: req.clientTable
  });
}

router.get('/clientlist', getClients, renderClientPage);


// End of method for inventory page
/////////////////////////////////////////////////////////////


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
