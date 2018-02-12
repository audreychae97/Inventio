const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'firsttestdb'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Main page with submission
app.get('/', function(req,res){
 res.sendfile('index.html');
});

// app.post('/book', function (req, res) {
//   console.log(req.body.id);
// });

//current
app.post('/book', function (req, res) {
   // Insert into db
   //db.query("INSERT INTO books (id, title, author, price) VALUES ('"+req.body.id+"', '"+req.body.title+"', '"+req.body.author+"', '"+req.body.price+"')", function (err, resp) {
   if(req.body.id){
     console.log("ID not null, no AUTO_INCREMENT");
     db.query("INSERT INTO books (id, title, author, price) VALUES ('"+req.body.id+"', '"+req.body.title+"', '"+req.body.author+"', '"+req.body.price+"')", function (err, resp) {
       if (err) throw err;
       // if there are no errors send an OK message.
       res.send('Save succesfull, posted to DB');
     });
   }
   else{
     console.log("ID is null, AUTO_INCREMENT instead");
     db.query("INSERT INTO books (title, author, price) VALUES ('"+req.body.title+"', '"+req.body.author+"', '"+req.body.price+"')", function (err, resp) {
       if (err) throw err;
       // if there are no errors send an OK message.
       res.send('Save succesfull, posted to DB');
     });
   }
 });

// Get table, and display to screen
app.get('/readTable', function (req, res) {

  db.query('SELECT * FROM books', function(err, rows, fields)
  {

      if (err) throw err;
      res.json(rows);
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
