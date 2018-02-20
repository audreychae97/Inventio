var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/src/views/';
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'warehouseTest'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

router.get("/about", function (req, res) {
  res.sendFile(path + "about.html");
});

router.post("/about", function (req, res) {
  console.log("post request");
  db.query("INSERT INTO products (name, category, weight, description) VALUES ('" + req.body.inputName + "', '" + req.body.selectCategory + "', '" + req.body.weightID + "', '" + req.body.descriptionID + "')", function (err, resp) {
    if (err) throw err;
    // if there are no errors send an OK message.
    console.log("No errors, posted to DB");
    res.redirect('/about');
  });

});

router.get("/contact",function(req,res){
  // need to send the query to the page some how...
  // db.query('SELECT * FROM products', function(err, rows, fields)
  // {
  //     if (err) throw err;
  //     //res.json(rows);
  //     res.send(rows);
  //     console.log(rows);
  // });
  res.render(path+"contact");
 // res.sendFile(path + "contact.html");  

});

app.use("/", router);

// app.use("*",function(req,res){
//   res.sendFile(path + "404.html");
// });

app.listen(3000, function () {
  console.log("Live at Port 3000");
});