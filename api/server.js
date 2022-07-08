const e = require('cors');
const express = require('express');
const mySQL = require('mysql');
const app = express();
var http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const socket = require('socket.io');

// Classes for the structure of the application. 

// Lobby Class means we can keep an object that associates a LobbyID with the lobby users.
class Lobby {
    constructor(id){
        this.LobbyID = id;
        this.lobbyUsers = [];
        //this.LobbyUsers[0] = '';
        //this.lobbyUsers[1] = '';
        //this.lobbyUsers[2] = '';
        //this.lobbyUsers[3] = '';
        this.numberOfUsers = 0;
    }

    addUser(userID){
        if(this.numberOfUsers >= 4){
            console.log("Error. Lobby is currently full");
            return false;
        }
        this.lobbyUsers[this.numberOfUsers++] = userID;
        for(var i = 0; i < this.numberOfUsers; i++){
            console.log(this.lobbyUsers[i]);
        }
    }

    removeUser(userID){
        for(var i = 0; i < this.numberOfUsers; i++){
            if(this.lobbyUsers[i] === userID){
                for(var j = i; j < this.numberOfUsers-1; j++){
                    this.lobbyUsers[j]= this.lobbyUsers[j+1]
                }
                this.lobbyUsers[this.numberofUsers--] = null;
            }
        }
    }

    
}

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

// Adding the socket.io Functionality here:

io.on('connection', (socket) => {
	console.log('Test complete. Socket connection has been established' + socket.id);
    socket.emit('testMessage');

    socket.on('JoinLobby', (lobbyID, UserID) => {
        console.log("User is trying to join lobby: " + lobbyID);
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
                socket.join(availableLobbies[i]);
                socket.emit('lobbySuccess', lobbyID);
                console.log("User has successfully joined the lobby");
                availableLobbies[i].addUser(UserID);
                socket.nsp.to(availableLobbies[i]).emit('updateUsers', availableLobbies[i].lobbyUsers)
                return;
            }else{
                continue;
            }
        }
        socket.emit('lobbyFailure');
        console.log("Lobby failure, my g");
    })

    socket.on('CreateNewLobby', (newLobbyID, usersID) => {
        console.log('Creating new Lobby with ID: ' + newLobbyID);
        var newLobby = new Lobby(newLobbyID);
        availableLobbies[numberOfLobbies] = newLobby;
        socket.join(availableLobbies[numberOfLobbies]);
        availableLobbies[numberOfLobbies].addUser(usersID);
        socket.nsp.to(availableLobbies[numberOfLobbies]).emit('updateUsers', availableLobbies[numberOfLobbies].lobbyUsers)
        numberOfLobbies++;

        for(var i = 0; i< numberOfLobbies; i++){
            console.log(availableLobbies[i].LobbyID);
        }
    })

    socket.on('closeLobby', (lobbyID) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
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


// Adding support for mySQL - Create connection to MYSQL - https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia

const dataBase = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tracker-hunt',
})

dataBase.connect((err) => {
    if(err){
        throw err;
        console.log(err + " has occurred")
    }
    console.log('MySQL has been Connected to the server');
})

nodeServer.listen(3090, function(){
    console.log("The server is now running on port " + 3090)
})

app.get('/', function(req, res){
    res.send("This is a test");
    console.log("User has connected " + req.id);
})

