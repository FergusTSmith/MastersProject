const e = require('cors');
const express = require('express');
const app = express();
var http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const socket = require('socket.io');

//Adding Support for a socket connection: https://www.thirdrocktechkno.com/blog/node-js-socket-io-chrome-extension-integration/

//Creating an HTTP Server to open a socket

const PORT = 3080;
var availableLobbies = [];
var numberOfLobbies = 0;

const socketServ = app.listen(PORT, function(){
    console.log('Server started on port ' + PORT);
    console.log('http://localhost:' + PORT);
})

const io = socket(socketServ, {
    cors: {
        origin: "http://localhost:3080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});


io.on('connection', (socket) => {
	console.log('Test complete. Socket connection has been established' + socket.id);
    socket.emit('testMessage');

    socket.on('JoinLobby', (lobbyID) => {
        console.log("User is trying to join lobby: " + lobbyID);
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i] === lobbyID){
                socket.join(lobbyID);
                socket.emit('lobbySuccess', lobbyID);
                console.log("User has successfully joined the lobby");
                return;
            }else{
                continue;
            }
        }
        socket.emit('lobbyFailure');
        console.log("Lobby failure, my g");
    })

    socket.on('CreateNewLobby', (newLobbyID) => {
        console.log('Creating new Lobby with ID: ' + newLobbyID);
        availableLobbies[numberOfLobbies++] = newLobbyID;
        socket.join(newLobbyID);
        for(var i = 0; i< numberOfLobbies; i++){
            console.log(availableLobbies[i]);
        }
    })

    socket.on('closeLobby', (lobbyID) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i] === lobbyID){
                for(var j = i; j < numberOfLobbies-1; j++){
                    availableLobbies[i] = availableLobbies[i+1]
                }
                availableLobbies[numberOfLobbies--] = null;

                //Need code to notify all users in that lobby that it has been closed.
            }
        }
    })
   
})

var nodeServer = http.createServer(app);




nodeServer.listen(3090, function(){
    console.log("The server is now running on port " + 3090)
})

app.get('/', function(req, res){
    res.send("This is a test");
    console.log("User has connected " + req.id);
})

