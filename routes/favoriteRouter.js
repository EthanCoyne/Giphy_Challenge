var express = require('express');
var config = {database: 'favorite_gifs'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

var bodyParser = require("body-parser");
router.use(bodyParser.json());


router.post('/favPOST',function(req,res){
  console.log('req.body:',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'INSERT INTO favorites (comment, url) values($1,$2) returning *;',
      [req.body.comment, req.body.url],
      function(err,result){
        done();
        if(err){
          console.log('error req.body: ', req.body);
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post

router.get('/GETfavs',function(req,res){
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
          console.log('favgifs from DB: ',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of get






module.exports = router;
