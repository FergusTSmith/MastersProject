const e = require('cors');
const express = require('express');
const mySQL = require('mysql');
const TypeORM = require('typeorm');
const app = express();
var http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const socket = require('socket.io');
//const {UserAccount} = require("./entity/UserAccount");

// Classes for the structure of the application. 

// Lobby Class means we can keep an object that associates a LobbyID with the lobby users.
class Lobby {
    constructor(id){
        this.LobbyID = id;
        this.lobbyUsers = [];
        this.numberOfUsers = 0;
    }

    addUser(userID){
        if(this.numberOfUsers >= 4){
            console.log("Error. Lobby is currently full");
            return false;
        }else{
            this.lobbyUsers[this.numberOfUsers++] = userID;
            for(var i = 0; i < this.numberOfUsers; i++){
                console.log(this.lobbyUsers[i]);
            }
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
        origin: "138.68.132.17",
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
                console.log("User has successfully joined the lobby " + lobbyID);
                availableLobbies[i].addUser(UserID);
                socket.nsp.to(availableLobbies[i]).emit('updateUsers', availableLobbies[i].lobbyUsers, lobbyID)
                return;
            }else{
                continue;
            }
        }
        socket.emit('lobbyFailure');
        console.log("Lobby failure, my g");
    })

    socket.on('CreateNewLobby', (newLobbyID, user) => {
        console.log('Creating new Lobby with ID: ' + newLobbyID);
        var newLobby = new Lobby(newLobbyID);
        availableLobbies[numberOfLobbies] = newLobby;
        
        socket.join(availableLobbies[numberOfLobbies]);
        availableLobbies[numberOfLobbies].addUser(user);
        console.log(user)

        //socket.nsp.to(availableLobbies[numberOfLobbies]).emit('updateUsers', availableLobbies[numberOfLobbies].lobbyUsers)
        socket.in(availableLobbies[numberOfLobbies]).broadcast.emit('updateUsers', availableLobbies[numberOfLobbies].lobbyUsers, newLobbyID)
        numberOfLobbies++;

        console.log(availableLobbies[numberOfLobbies-1].lobbyUsers)

        for(var i = 0; i< numberOfLobbies; i++){
            console.log(availableLobbies[i].LobbyID);
        }
        console.log(numberOfLobbies);
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
    socket.on('playerLeft', (user, lobbyID) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
                for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                    if(availableLobbies[i].lobbyUsers[j] === user){
                        for(var k = j; k < availableLobbies[i].lobbyUsers.length-1; k++){
                            availableLobbies[i].lobbyUsers[k] = availableLobbies[i].lobbyUsers[k+1]
                        }
                        availableLobbies[i].lobbyUsers[availableLobbies[i].lobbyUsers.length] = undefined;
                        socket.nsp.to(availableLobbies[i]).emit('removePlayerFromLobby', user, lobbyID)
                    }
                }
            }
        }
    })
    

    socket.on('newUser', (userID, googleID) => {
        
    })

    socket.on('playerReady', (user, lobbyID) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
                socket.nsp.to(availableLobbies[i]).emit('player_is_ready', user, lobbyID);
            }
        }
    })

    socket.on('scoreUpdate', (user, lobbyID, userScore) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
                for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                    if(availableLobbies[i].lobbyUsers[j].userID === user.userID){
                        availableLobbies[i].lobbyUsers[j].score = userScore;
                        socket.nsp.to(availableLobbies[i]).emit('updateUsers', availableLobbies[i].lobbyUsers, lobbyID)
                    }
                }
            }
        }
    })

    socket.on('startTheGame', (lobbyID) => {
        for(var i = 0; i < numberOfLobbies; i++){
            if(availableLobbies[i].LobbyID === lobbyID){
                socket.nsp.to(availableLobbies[i]).emit('startGame', availableLobbies[i].LobbyID)
            }
        }
    })
})

var nodeServer = http.createServer(app);


// Adding support for mySQL - Create connection to MYSQL - https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia

const dataBase = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TucoDexter123!@',
    database: 'trackerhunt'
})

/*dataBase.connect((err) => {
    if(err){
        throw err;
        console.log(err + " has occurred")
    }
    console.log('MySQL has been Connected to the server');
})

// Create Database - https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE trackerhunt';
    dataBase.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            res.send('Database Created...')
            console.log(result);
        }
    })
})*/

// Create a Table for the server
app.get('/createATable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(100), body VARCHAR(255), PRIMARY KEY (id))';
    dataBase.query(sql, (err, result) => {
        if(err){
            console.log("Error occurred: " + err);
            throw err;
        }
        console.log(result);
        res.send('Post table created');
    })
})

nodeServer.listen(3090, function(){
    console.log("The server is now running on port " + 3090)
})

app.get('/', function(req, res){
    res.send("This is a test");
    console.log("User has connected " + req.id);
})

// Database methods

