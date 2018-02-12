var express = require('express');
var app = express();

app.use(express.static('public'))

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'firsttestdb'
});

app.get('/', (req, res) => res.send('Hello World! Call to /rows for query'))
app.get('/rows', function (req, res) {
  connection.connect();

  connection.query('SELECT * FROM books', function(err, rows, fields)
  {
      connection.end();

      if (err) throw err;

      res.json(rows);

  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000! Call localhost:3000/rows');
});
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
//
// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'firsttestdb'
// });
//
// connection.connect()
//
// connection.query('SELECT * from books', function (err, rows, fields) {
//   if (err) throw err
//
//   console.log('The solution is: ', rows)
// })
//
// connection.end()
