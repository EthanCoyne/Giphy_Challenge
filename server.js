var express = require('express');
// var index = require('./routes/index');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var config = {database: 'favorite_gifs'}
var pool = new pg.Pool(config);
var favoriteRouter = require('./routes/favoriteRouter')


app.use(express.static('public'));
app.use(bodyParser.json());
// app.use('/', index);

app.use('/favorite', favoriteRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});










app.get('/favorite',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * FROM favorites;',
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of get







var port = app.listen(process.env.PORT || 3000);
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
// var server = app.listen(port, function() {
//   console.log('Server listening on port', server.address().port);
// });
