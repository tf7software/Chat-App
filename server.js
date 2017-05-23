var http = require('http'),
	express = require('express'),
	chatServer = require('./lib/chat-server');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + '/public'));

//set up a nodeJS server
var server = http.createServer(app).listen('3000', 'localhost'); 
chatServer.listen(server);

//express way to create routes
app.get('/', function(req, res){ //req and res are of http type
	res.sendfile(__dirname + '/views/index.html');
});
