const express = require('express');
const app = express();
var http = require('http');

//Adding Support for a socket connection: https://www.thirdrocktechkno.com/blog/node-js-socket-io-chrome-extension-integration/

//Creating an HTTP Server to open a socket

const socket = require('http').createServer(app);
var io = require('socket.io')(socket)

socket.listen(3090, function(){
	console.log("The socket server is now running on port 3090");
})

io.on('connection', function(socketvar){
	console.log('Test complete. Socket connection has been established')
})

var nodeServer = http.createServer(app);

nodeServer.listen(3080, function(){
    console.log("The server is now running on port 3080")
})

app.get('/', function(req, res){
    res.send("This is a test");
    console.log("User has connected");
})