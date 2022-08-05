const e = require('cors');
const express = require('express');
const mySQL = require('mysql2');
const app = express();
var http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const socket = require('socket.io');
const db = require('./models')
const sequelize = require('sequelize')
const { UserAccount } = require('./models');
const { GameDetails } = require('./models');

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
//var socketServ = undefined;


//db.sequelize.sync().then((req) => { 
    //socketServ = app.listen(PORT, function(){
        //console.log('Server started on port ' + PORT);
       // console.log('http://localhost:' + PORT);
    //})
//})
db.sequelize.sync().then((req) => {
    const socketServ = app.listen(PORT, function(){
        console.log('Server started on port ' + PORT);
        console.log('http://localhost:' + PORT);
    })
    
    
    const io = socket(socketServ, {
        cors: {
            //origin: "138.68.132.17:3080",
            origin: "localhost",
            //origin: "localhost",
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
            for(var i = 0; i < availableLobbies.length; i++){
                console.log(availableLobbies)
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        var isUserAlreadyInLobby = false;
                        for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                            if(availableLobbies[i].lobbyUsers[j].userID === UserID.userID){
                                isUserAlreadyInLobby = true;
                            }
                        }
                        console.log(availableLobbies[i]);
                        console.log(isUserAlreadyInLobby);
                        console.log(UserID)
                        
                        if(!isUserAlreadyInLobby){
                            socket.join(availableLobbies[i]);
                            console.log("User has successfully joined the lobby " + lobbyID);
                            availableLobbies[i].addUser(UserID);
                            socket.emit('lobbySuccess', [lobbyID, availableLobbies[i].lobbyUsers]);
                            socket.nsp.to(availableLobbies[i]).emit('updateUsers', [availableLobbies[i].lobbyUsers, availableLobbies[i].LobbyID])
                            return;
                        }else{
                            // Rejoins the user to the lobby but doesn't add them as a new user.
                            socket.join(availableLobbies[i]);
                            console.log("This shouldn't add the user again");
                            socket.emit('lobbySuccess', [lobbyID, availableLobbies[i].lobbyUsers]);
                            return;
                        }
                    }
                }else{
                    continue;
                }
            }
            socket.emit('lobbyFailure');
            console.log("Lobby failure, my g");
        })

        socket.on('playerInvited', (inviteUsername, inviter, lobbyID) => {
            console.log('Server received the invitiation request')
            io.emit('playerInvitedToLobby', inviteUsername, inviter, lobbyID);
        })
    
        socket.on('CreateNewLobby', (newLobbyID, user) => {
            console.log('Creating new Lobby with ID: ' + newLobbyID);
            var newLobby = new Lobby(newLobbyID);
            numberOfLobbies = availableLobbies.length;
            availableLobbies[numberOfLobbies] = newLobby;
            
            socket.join(availableLobbies[numberOfLobbies]);
            availableLobbies[numberOfLobbies].addUser(user);
            console.log(user.username)
    
            //socket.nsp.to(availableLobbies[numberOfLobbies]).emit('updateUsers', availableLobbies[numberOfLobbies].lobbyUsers)
            socket.in(availableLobbies[numberOfLobbies]).broadcast.emit('updateUsers', (availableLobbies[numberOfLobbies].lobbyUsers, availableLobbies[numberOfLobbies].LobbyID))
            numberOfLobbies++;
    
            console.log(availableLobbies[numberOfLobbies-1].lobbyUsers)
    
            console.log(availableLobbies);
            console.log(numberOfLobbies);
        })
    
        socket.on('closeLobby', (lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                console.log(availableLobbies);
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        /*for(var j = i; j < numberOfLobbies-1; j++){
                            availableLobbies[i] = availableLobbies[i+1]
                        }
                        availableLobbies[numberOfLobbies--] = null;*/
                        availableLobbies.splice(i, 1);
                        console.log(availableLobbies)
        
                        //Need code to notify all users in that lobby that it has been closed.
                    }
                }
            
            }
            // Code to make sure that any random lobbies with no users are deleted:
            console.log(availableLobbies)
            for(var j = 0; j < availableLobbies.length; j++){
                if(availableLobbies[j].lobbyUsers.length === 0){
                    availableLobbies.splice(j, 1);
                    console.log(availableLobbies);
                }
            }
        })
        socket.on('playerLeft', (LobbyUsers, lobbyID, userID) => {
            console.log('Looking for lobby... ' + lobbyID)
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        console.log(lobbyID + ' found.')
                        availableLobbies[i].lobbyUsers = LobbyUsers;
                        socket.in(availableLobbies[i]).broadcast.emit('updateUsers', availableLobbies[i].lobbyUsers, availableLobbies[i].LobbyID);
                        console.log('emitted update to front end');
                        socket.in(availableLobbies[i]).broadcast.emit('player_leave_message', userID);
                        console.log(availableLobbies)
                    }
                }   
            }
        })
        socket.on('gameModeAndTime', (lobbyID, gameMode, timer) => {
            console.log('69 Attempting to update gamemode')
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        console.log('69 found the lobby')
                        socket.in(availableLobbies[i]).broadcast.emit('updateGameModeAndTime', lobbyID, gameMode, timer)
                        console.log('69 emitted the message to front end')
                    }
                }            
            }
        })
    
        socket.on('countriesToVisit', (lobbyID, countriesToVisit) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        socket.in(availableLobbies[i]).broadcast.emit('receiveCountriesToVisit', lobbyID, countriesToVisit);
                    }
                }
            }
        })
    
        socket.on('newUser', (userID, usergoogleID) => {
            UserAccount.findAll({ where: { googleID: usergoogleID}}).then((users => {
                if(users.length === 0){
                    UserAccount.create({
                        username: userID,
                        gamesPlayed: 0,
                        wonGames: 0,
                        googleID: usergoogleID,
                    }).catch((err) => {
                        if(err){
                            throw err;
                        }
                    })
                }else{
                    console.log("Error, user already in table")
                    console.log(users);
                }
            }))
            
    
        })
        socket.on('addScoreToDatabase', (userID, gameMode, score, multiplayer, startTime) => {
            console.log('Test - server received the request!!');
            GameDetails.create({
                username: userID,
                Score: score,
                gameType: gameMode,
                Multiplayer: multiplayer,
                startTime: startTime,
            }).catch((err) => {
                if(err){
                    throw err;
                }
            })
        })
        
    
        socket.on('endBingoGame', (lobbyID, winnerID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        socket.in(availableLobbies[i]).broadcast.emit('endBingoModeGame', lobbyID, winnerID);
                    }
                }            
            }
        })
    
        socket.on('newUsername', (usergoogleID, newID) => {
            UserAccount.update({ username: newID }, {where: { googleID: usergoogleID }}).then((res) => {
                console.log(res);
            })
        })
        socket.on('gameWon', (usergoogleID) => {
            UserAccount.increment('wonGames', { by: 1, where: { googleID: usergoogleID}});
        })
    
        socket.on('RetrieveUsers', () => {
            UserAccount.findAll().then((users) => {
                chrome.storage.local.set({gameUsers: users})
            })
        })

        socket.on('retrieveDetails', (userGoogleID) => {
            UserAccount.findAll({ where: {googleID: userGoogleID}}).then((res) => {
                socket.emit('sendUserDetails', res)
            })
        })

        socket.on('retrieveLeaderBoards', () => {
            var MultiClassic = [];
            var MultiBingo = [];

            GameDetails.findAll({ where: {gameType: 'Classic', Multiplayer: true}, order:[['Score', 'DESC']], limit: 10}).then((res) => {
                MultiClassic = res;
                //console.log(MultiClassic);

                for(var i = 0; i < MultiClassic.length; i++){
                    MultiClassic[i].createdAt = MultiClassic[i].createdAt.toString().substr(0, 9)
                }
                socket.emit('sendClassicLeaderBoards', MultiClassic);


            });

            GameDetails.findAll({ where: {gameType: 'Bingo', Multiplayer: true}, order:[['Score', 'DESC']]}).then((res) => {
                MultiBingo = res; 
                //console.log(MultiBingo);
                socket.emit('sendBingoLeaderBoards', MultiBingo);
            })
        })
        socket.on('retreiveSoloScores', (userID) => {
            var SoloClassic = [];
            var SoloBingo = [];

            GameDetails.findAll({ where: {gameType: 'Classic', Multiplayer: false, username: userID}, order:[['Score', 'DESC']], limit: 10}).then((res) => {
                SoloClassic = res;
                //console.log(SoloClassic);

                for(var i = 0; i < SoloClassic.length; i++){
                    SoloClassic[i].createdAt = SoloClassic[i].createdAt.toString().substr(0, 9)
                }
                socket.emit('sendSoloClassic', SoloClassic, userID);


            });

            GameDetails.findAll({ where: {gameType: 'Bingo', Multiplayer: false, username: userID}}).then((res) => {
                SoloBingo = res; 
                //console.log(SoloBingo);
                socket.emit('sendSoloBingo›', SoloBingo, userID);
            })
        })
    
        socket.on('doesUserExist', (userGoogleID) => {
            console.log("Query received");
            console.log(userGoogleID);
            UserAccount.findAll({ where: { googleID: userGoogleID }}).then((users) => {
                console.log(users);
                if(users.length === 0){
                    socket.emit('UserNotFound')
                }else{
                    socket.emit('UserFound', users)
                    console.log('Found user')
                    for(var i = 0; i < availableLobbies.length; i++){
                        console.log(availableLobbies[i]);
                        for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                            console.log('Attempting to search through lobby for players')
                            console.log(availableLobbies[i].lobbyUsers)
                            if(availableLobbies[i].lobbyUsers[j].googleID === userGoogleID){
                                socket.emit('UserInMultiplayer', availableLobbies[i].LobbyID, availableLobbies[i].lobbyUsers);
                                console.log("Found the player")
                            }
                        }
                    }
                }
            })
        })
    
        socket.on('playerReady', (user, lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('player_is_ready', user, lobbyID);
                    for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                        console.log(availableLobbies[i].lobbyUsers)
                        if(availableLobbies[i].lobbyUsers[j].userID === user.userID){
                            availableLobbies[i].lobbyUsers[j] = user;
                        }
                    }
                }
            }
        })
    
        socket.on('scoreUpdate', (user, lobbyID, userScore) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                        if(availableLobbies[i].lobbyUsers[j].userID === user.userID){
                            availableLobbies[i].lobbyUsers[j].score = userScore;
                            socket.nsp.to(availableLobbies[i]).emit('updateUsers', availableLobbies[i].lobbyUsers, availableLobbies[i].LobbyID)
                        }
                    }
                }
            }
        })

        socket.on('nameTaken', (userID) => {
            UserAccount.findAll({ where: { username: userID }}).then((users) => {
                if(users.length === 0){
                    socket.emit('nameAvailable', userID)
                }else{
                    socket.emit('nameUnavailable', userID)
                }
            })
        })
    
        socket.on('bingoScoreUpdate', (userProfile, lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                        if(availableLobbies[i].lobbyUsers[j].userID === userProfile.userID){
                            availableLobbies[i].lobbyUsers[j].BingoCountries = userProfile.BingoCountries;
                            console.log("Should update bingo score here");
                            socket.nsp.to(availableLobbies[i]).emit('updateUsers', availableLobbies[i].lobbyUsers, availableLobbies[i].LobbyID)
                        }
                    }
                }
            }
        })
    
        socket.on('startTheGame', (lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('startGame', availableLobbies[i].LobbyID)
                    for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                        UserAccount.increment('gamesPlayed', { by: 1, where: { username: availableLobbies[i].lobbyUsers[j].userID }})
                    }
                }
            }
        })

        socket.on('getGameDetails', (lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('sendGameDetails', lobbyID);
                    console.log("asked other users for details");
                }
            }
        })

        socket.on('sendingGameDetails', (GameMode, timer, LobbyUsers, lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                console.log("looking for lobby to rejoin..." + lobbyID)
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to('RejoinGame', GameMode, timer, LobbyUsers)
                    console.log("Found lobby and rejoining game");
                }
            }
        })
    })
    
    var nodeServer = http.createServer(app);
    
    
    // Adding support for mySQL - Create connection to MYSQL - https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia
    
    nodeServer.listen(3090, function(){
        console.log("The server is now running on port " + 3090)
    })
    
    app.get('/', function(req, res){
        res.send("This is a test");
        console.log("User has connected " + req.id);
    });
    
    app.get('/socket.io', function(req, res){
        res.send("test passed")
    })
    
    app.post('/socket.io', function(req, res){
        res.send("Post test passed")
    })
    
    // Database methods
    
    app.get('/select', (req, res) => {
        res.send('select')
    });
    
    app.get('/insert', (req, res) => {
        UserAccount.create({
            username: "Goose",
            gamesPlayed: 0,
            wonGames: 0,
            googleID: "test",
        }).catch(err => {
            if(err){
                throw err;
            }
        })
    
        res.send('Mhmm');
    });
    
    app.get('/delete', (req, res) => {
        res.send('delete')
    });
    
});

