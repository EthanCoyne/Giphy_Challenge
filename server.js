var express = require('express');
// var index = require('./routes/index');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var config = {database: 'favorite_gifs'}
var pool = new pg.Pool(config);
var favoriteRouter = require('./routes/favoriteRouter')
//I may not need all of these ^^, but i'm too afraid to remove any of them :/. I think I do though


app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/*', index);

app.use('/favorite', favoriteRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});



var port = app.listen(process.env.PORT || 3000);
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
// var server = app.listen(port, function() {
//   console.log('Server listening on port', server.address().port);
// });
