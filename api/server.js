/* The server.js file lives on an Amazon Web Server and is designed to maintain state of multiple games of TrackerHunt at once
* All of the interaction between Client and Server occurs through the Socket.IO Package
* Below, a number of event listeners are created, and will send information and responses to the front-end of the application.
*/

// Importing the required packages
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

// Lobby Class means we can keep an object that associates a LobbyID with the lobby users. This is for tracking the currently running Multiplayer games.
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

// Adding Support for a socket connection: https://www.thirdrocktechkno.com/blog/node-js-socket-io-chrome-extension-integration/

// Creating an HTTP Server to open a socket using Express

const PORT = 3080;
var availableLobbies = [];
var numberOfLobbies = 0;
var playersInASoloGame = [];

// This creates the database tables if not already created, and connects to the database
db.sequelize.sync().then((req) => {
    const socketServ = app.listen(PORT, function(){
        console.log('Server started on port ' + PORT);
        console.log('http://localhost:' + PORT);
    })
    // Creating a Socket.IO Server Websocket.
    const io = socket(socketServ, {
        cors: {
            origin: "localhost",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });
    
    // Below are the socket.IO events that the server will react to.


    // This event fires uppon connection
    io.on('connection', (socket) => {
        console.log('Test complete. Socket connection has been established' + socket.id);
        socket.emit('testMessage');
    
        // This event fires whenever a user attempts to join a lobby.
        socket.on('JoinLobby', (lobbyID, UserID) => {
            console.log("User is trying to join lobby: " + lobbyID);
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        // Once we have found the lobby the user is attempting to join, we'll make sure that user isn't already in that user.
                        var isUserAlreadyInLobby = false;
                        for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                            if(availableLobbies[i].lobbyUsers[j].userID === UserID.userID){
                                isUserAlreadyInLobby = true;
                            }
                        }
                        // If the user is not already in a lobby...
                        if(!isUserAlreadyInLobby){
                            // socket.join Will connect this user to the room with other users, allowing communication to this lobby.
                            socket.join(availableLobbies[i]);
                            console.log("User has successfully joined the lobby " + lobbyID);
                            availableLobbies[i].addUser(UserID);
                            // Event emitted to the front end to inform the user that joining the lobby was a success, and an 'updateUsers' event is sent to other lobby users so that the new user is displayed to them.
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
            // Event fired in the case of an error.
            socket.emit('lobbyFailure');
            console.log("Lobby failure");
        })
        // 'playerInvited' Will send an event to all users connected, and the front end will determine if it is appropriate for that client to react.
        socket.on('playerInvited', (inviteUsername, inviter, lobbyID) => {
            console.log('Server received the invitiation request')
            io.emit('playerInvitedToLobby', inviteUsername, inviter, lobbyID);
        })
        // Logic for creating a new lobby. Creates a new Lobby object with the new Lobby ID, and then adds the creator of the lobby to this lobby.
        socket.on('CreateNewLobby', (newLobbyID, user) => {
            console.log('Creating new Lobby with ID: ' + newLobbyID);
            var newLobby = new Lobby(newLobbyID);
            numberOfLobbies = availableLobbies.length;
            availableLobbies[numberOfLobbies] = newLobby;
            socket.join(availableLobbies[numberOfLobbies]);
            availableLobbies[numberOfLobbies].addUser(user);
            // Event emitted to all the users in the lobby to update the list of users within that lobby. This means that the lobby creator will see themselves as a user in the lobby.
            socket.in(availableLobbies[numberOfLobbies]).broadcast.emit('updateUsers', (availableLobbies[numberOfLobbies].lobbyUsers, availableLobbies[numberOfLobbies].LobbyID))
            numberOfLobbies++;
        })
        // Event for closing a lobby, which will iterate through the available lobbies until a match is made, and then splice this array to remove this lobby.
        socket.on('closeLobby', (lobbyID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                console.log(availableLobbies);
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        availableLobbies.splice(i, 1);
                        console.log(availableLobbies)
                    }
                }
            
            }
            // Code to make sure that any random lobbies with no users are deleted:
            console.log(availableLobbies)
            for(var j = 0; j < availableLobbies.length; j++){
                if(availableLobbies[j].lobbyUsers === null || availableLobbies[j].lobbyUsers.length === 0){
                    availableLobbies.splice(j, 1);
                    console.log(availableLobbies);
                }
            }
        })
        // Logic for when a player leaves. First, we update the users in the availableLobbies array. Then, we emit two events, one to update the UsersInLobby object for other users in the lobby, and one to emit the message that this player specifically has left.
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
        // This event is for when a lobby is created, and will be to receive the game details from the lobby creator and send these to all the other lobby users.
        socket.on('gameModeAndTime', (lobbyID, gameMode, timer) => {
            console.log('Attempting to update gamemode')
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        console.log('found the lobby')
                        socket.in(availableLobbies[i]).broadcast.emit('updateGameModeAndTime', lobbyID, gameMode, timer)
                        console.log('emitted the message to front end')
                    }
                }            
            }
        })
        // This is for Bingo games, and ensures that all users will have the same list of countries. This event will be received from the lobby creator and sent to all other lobby users.
        socket.on('countriesToVisit', (lobbyID, countriesToVisit) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        socket.in(availableLobbies[i]).broadcast.emit('receiveCountriesToVisit', lobbyID, countriesToVisit);
                    }
                }
            }
        })
        // This event fires when attempting to rejoin a multiplayer bingo game. This ensures that the countries visited are resent from other users in the lobby to the rejoining user.
        socket.on('BingoRejoin', (lobbyID, usersID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        socket.in(availableLobbies[i]).broadcast.emit('resendBingo', lobbyID, usersID);
                        console.log("Resent Bingo Countries")
                    }
                }
            }
        })
        // This event concerns Account creation. This uses Sequelize to create a new row in the table for a user, so that their information is stored persistently. 
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
        // Event is fired at the end of any game, and ensures that the user's score is stored in the database using the Sequelize ORM. 
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
        // This event is fired whenever a user wins a Bingo Game. This means that, once a player finishes their list of countries, the game is ended for all users in the lobby.
        socket.on('endBingoGame', (lobbyID, winnerID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i] != undefined){
                    if(availableLobbies[i].LobbyID === lobbyID){
                        socket.in(availableLobbies[i]).broadcast.emit('endBingoModeGame', lobbyID, winnerID);
                    }
                }            
            }
        })
        // This event is fired upon changing username, and ensures that the change is reflected on the Database
        socket.on('newUsername', (usergoogleID, newID) => {
            UserAccount.update({ username: newID }, {where: { googleID: usergoogleID }}).then((res) => {
                console.log(res);
            })
        })
        // This event is fired for the game winner, and increments their "gamesWon" attribute on the database
         socket.on('gameWon', (usergoogleID) => {
            UserAccount.increment('wonGames', { by: 1, where: { googleID: usergoogleID}});
        })
        // [Come back to]
        socket.on('RetrieveUsers', () => {
            UserAccount.findAll().then((users) => {
                chrome.storage.local.set({gameUsers: users})
            })
        })
        // This retrieves the username for a user from the database if their Google ID has been encountered previously.
        socket.on('retrieveDetails', (userGoogleID) => {
            UserAccount.findAll({ where: {googleID: userGoogleID}}).then((res) => {
                socket.emit('sendUserDetails', res)
            })
        })
        // Event is fired upon opening the home page. This makes sure that the data for the leaderboards is retrieved from the database and sent to the front-end. This is for multiplayer games.
        socket.on('retrieveLeaderBoards', () => {
            var MultiClassic = [];
            var MultiBingo = [];
            GameDetails.findAll({ where: {gameType: 'Classic', Multiplayer: true}, order:[['Score', 'DESC']], limit: 10}).then((res) => {
                MultiClassic = res;
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
        // We have a separate event for retrieving solo scores. As with the above, this ensures that the solo leaderboards are retrieved from the database and sent to the front end
        socket.on('retreiveSoloScores', (userID) => {
            var SoloClassic = [];
            var SoloBingo = [];
            GameDetails.findAll({ where: {gameType: 'Classic', Multiplayer: false, username: userID}, order:[['Score', 'DESC']], limit: 10}).then((res) => {
                SoloClassic = res;
                for(var i = 0; i < SoloClassic.length; i++){
                    SoloClassic[i].createdAt = SoloClassic[i].createdAt.toString().substr(0, 9)
                }
                socket.emit('sendSoloClassic', SoloClassic, userID);
            });
            GameDetails.findAll({ where: {gameType: 'Bingo', Multiplayer: false, username: userID}}).then((res) => {
                SoloBingo = res; 
                socket.emit('sendSoloBingo›', SoloBingo, userID);
            })
        })
        // This logic is fired from the front end on sign in. The Google ID for the signing in user is retrieved, and this is the server attempting to identify if the user has been previously encountered.
        socket.on('doesUserExist', (userGoogleID) => {
            UserAccount.findAll({ where: { googleID: userGoogleID }}).then((users) => {
                if(users.length === 0){
                    // If no users found, inform the front end that no user was found.
                    socket.emit('UserNotFound')
                }else{
                    // Else, inform the front end that the user has been found, and send the information of this to the front-end.
                    socket.emit('UserFound', users)
                    // Now, the server will attempt to determine whether or not the player is previously in a game before exiting. If found in a single or multiplayer game, an event is sent to the front end. 
                    if(playersInASoloGame.includes(userGoogleID)){
                        socket.emit('UserInSinglePlayer', userGoogleID)
                        console.log('found player in single game');
                    }
                    for(var i = 0; i < availableLobbies.length; i++){
                        console.log(availableLobbies[i]);
                        for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                            console.log('Attempting to search through lobby for players')
                            console.log(availableLobbies[i].lobbyUsers)
                            if(availableLobbies[i].lobbyUsers[j].googleID === userGoogleID){
                                socket.emit('UserInMultiplayer', availableLobbies[i].LobbyID, availableLobbies[i].lobbyUsers);
                                console.log("Found the player - Multiplayer");
                                socket.join(availableLobbies[i]);
                            }
                        }
                    }
                }
            })
        })
        // This event is fired whenever a user signals that they are ready. An event is sent to that lobby to tell the other users this lobby is ready.
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
        // This event is fired each time a user's score is incremeneted. This is to make sure that all the users can see eachother's socres. The scores are inside the user object, and by updating the user object, we update that user's score.
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
        // This event is fired when a user is attempting to set or change a username. If the username is already taken, they are informed they have to pick again. 
        socket.on('nameTaken', (userID) => {
            UserAccount.findAll({ where: { username: userID }}).then((users) => {
                if(users.length === 0){
                    socket.emit('nameAvailable', userID)
                }else{
                    socket.emit('nameUnavailable', userID)
                }
            })
        })
        // As with the above, this event is fired during bingo mode games to ensure that the scores are kept up to date on each user's screen. 
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
        // This event fires whenever a lobby creator clicks "Start". This makes sure that the game starts at the same time for each player, so each game is synced.
        socket.on('startTheGame', (lobbyID) => {
            console.log("TestStart")
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('startGame', availableLobbies[i].LobbyID)
                    console.log("Start game emitted")
                    for(var j = 0; j < availableLobbies[i].lobbyUsers.length; j++){
                        UserAccount.increment('gamesPlayed', { by: 1, where: { username: availableLobbies[i].lobbyUsers[j].userID }})
                    }
                }
            }
        })
        // This logic removes players from both solo and multiplayer games. This is fired whenever a game finishes, and makes sure that a user won't attempt to rejoin a finished game. 
        socket.on('endPreviousGames', (userID, googleID) => {
            console.log("Searching Solo Games");
            for(var i = 0; i < playersInASoloGame.length; i++){
                if(playersInASoloGame[i] === googleID){
                    playersInASoloGame = playersInASoloGame.splice(i, 1);
                }
            }
            for(var j = 0; j < availableLobbies.length; j++){
                for(var k = 0; k < availableLobbies[j].lobbyUsers.length; k++){
                    if(availableLobbies[j].lobbyUsers[k] === userID){
                        availableLobbies[j].lobbyUsers = availableLobbies[j].lobbyUsers.splice(k, 1)
                    }
                }
            }
        })
        // This event is fired upon rejoining a game. This event sends a request to other lobby users in order to receive the current game state.
        socket.on('getGameDetails', (lobbyID, userID) => {
            for(var i = 0; i < availableLobbies.length; i++){
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('sendGameDetails', lobbyID, userID);
                    console.log("asked other users for details");
                }
            }
        })
        // When requested for current game state, this event is fired by other users. This then fires a 'RejoinGame" event for the rejoining user, and updateUsers to all lobby users to see that the player has rejoined.
        socket.on('sendingGameDetails', (GameMode, timer, LobbyUsers, lobbyID, UsersID, allPlayersReady, countriesToVisit) => {
            for(var i = 0; i < availableLobbies.length; i++){
                console.log("looking for lobby to rejoin..." + lobbyID)
                if(availableLobbies[i].LobbyID === lobbyID){
                    socket.nsp.to(availableLobbies[i]).emit('RejoinGame', GameMode, timer, LobbyUsers, UsersID, lobbyID, allPlayersReady, countriesToVisit)
                    console.log("Found lobby and rejoining game");
                    socket.nsp.to(availableLobbies[i]).emit('updateUsers', [availableLobbies[i].lobbyUsers, availableLobbies[i].LobbyID])
                }
            }
        })
        // This event is fired whenever a player creates a new solo game. This ensures that the server maintains this state, and allows the user to rejoin games later on. 
        socket.on('playerInSoloGame', (userGoogleID) => {
            console.log(playersInASoloGame)
            if(!(playersInASoloGame.includes(userGoogleID))){
                playersInASoloGame.push(userGoogleID);
                console.log("Solo game players: " + playersInASoloGame)
            }
        })
        // Event is fired whenever a solo game is finished. This ensures the user does not attempt to rejoin an ended game. 
        socket.on('soloGameFinished', (userGoogleID) => {
            for(var i = 0; i < playersInASoloGame.length; i++){
                if(playersInASoloGame[i] === userGoogleID){
                    playersInASoloGame.splice(i, 1);
                    console.log('removed player from solo games')
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
    
    // Database methods - These were created before it was decided that a RESTful API would not be appropriate in this application. 
    
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

