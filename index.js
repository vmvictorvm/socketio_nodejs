var express = require('express');
var app = express();
var io = require('socket.io')();

app.set('port', process.env.PORT || 3000 );
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});


io.attach(server);

io.on('connection', function(socket) {

  socket.on('postMessage', function(data) { //Detect that the postMessage event happened
    io.emit('updateMessages', data);  //Issue a message to all connected devices with the data
  });
});
