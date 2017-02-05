var express = require('express');
// var index = require('./routes/index');
var path = require('path');
var app = express();


app.use(express.static('public'));
// app.use('/', index);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.listen(process.env.PORT || 3000);
// var server = app.listen(port, function() {
//   console.log('Server listening on port', server.address().port);
// });
