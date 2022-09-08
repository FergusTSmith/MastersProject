<!----------
- The LobbyView.vue file is the component responsible for rendering the page where Multiplayer games are configured. 
- Parents: HomePage.vue
- Children: MultiPlayerGame.vue
------------->

<template>
    <div v-if="LobbyPage">
    <h2>TrackerHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }} </p>
    <p class="HelpText" v-if="InformationBox && isLobbyCreator">{{ ClassicInfo }}</p>
    <p class="HelpText" v-if="InformationBox && isLobbyCreator">{{ BingoInfo }}</p>
    <div class="RadioButtons">
        <p v-if="isLobbyCreator" class="HelpText">Choose GameMode: <button @click="displayInformation" class="InformationBox" id="Info">i</button></p>
        <input id="Classic" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label id="ClassicRadio" for="Classic" v-if="isLobbyCreator">Classic</label>
        <input id="Bingo" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label id="BingoRadio" for="Bingo" v-if="isLobbyCreator">Bingo</label>
    </div>
    <div class="Players">
        <p class="HelpText">Connected Players:</p>
        <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :class="{ active: show === count}" :key="count" @mouseover="show = count" @mouseout="show = false">
            {{ ++count }}. {{ item.userID }} <button id="Kick" v-if="(item.userID != this.UsersID) && this.isLobbyCreator" @click="kickPlayer(item.userID)">Kick</button> 
        </li>
        <br/><br/>
    </div>
    <br/>
    <!---- Radio Buttons adapted from tutorial: M Heath, "Customize Radio Button with CSS", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022-->
    <div class="RadioButtons">
        <p v-if="isLobbyCreator" class="HelpText">Choose length of round:</p>
        <input id="twoMins" v-if="isLobbyCreator" class="Radio" type="radio" value="120" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="twoMins" v-if="isLobbyCreator">2 min</label>
        <input id="fiveMins" v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label id="fiveMinsRadio" for="fiveMins" v-if="isLobbyCreator">5 min</label>
        <input id="tenMins" v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label id="tenMinsRadio" for="tenMins" v-if="isLobbyCreator">10 min</label>
    </div>
    <p class="HelpText" v-if="(!isLobbyCreator)">Please wait for the lobby creator to choose the Game Mode and time</p>
    <br/>
    <button id="closeLobby" v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
    <button id="invitePlayer" v-if="isLobbyCreator" type="button" @click="openInvite">Invite Player</button>
    <div v-if="playerInvite">
        <transition name="fade"><input class="textBox" v-if="playerInvite" ref="usernameInvite" type="text" id="Invite"/></transition><label v-if="playerInvite" class="HelpText">Username</label>
        <br/>
        <button id="playerInvite" v-if="playerInvite" @click="invitePlayer">Invite</button>
        <br/>
    </div>
    <button id="beginGame" @click="multiGameInitiated" type="button">Begin Game</button>
    <button id="leaveGame" @click="leaveGame" type="button">Leave Game</button>
    </div>

    <div v-if="MultiPlayer" id="Multiplayer-Game" :key="componentVersion">
        <MultiPlayerGame :userMultiContinue="userMultiContinue" :multiGameDetails="multiGameDetails" :UsersID="UsersID" :playersLobby="playersLobby" :userProfile="userProfile" @ClearMultiVariable="ClearMultiVariable" @playerReady="playerReady" @leaveGame="leaveGame" @gameSetup="gameSetup" @endGame="endGame" @exitToHomePageReset="exitToHomePageReset" :isLobbyCreator="isLobbyCreator" :UsersInLobby="UsersInLobby" :GameMode="GameMode"  :startTime="timer"  ></MultiPlayerGame>
    </div>
</template>

<script>
import MultiPlayerGame from '@/components/MultiPlayerGame.vue'

export default {
    // In created(), we assign the UsersInLobby prop to the LobbyUsers variable, to allow us to manipulate the data in this variable without mutating the prop directly, which is disallowed by vue.   
    created(){
        this.LobbyUsers = this.UsersInLobby
    },
    sockets: {
        // This allows the lobby users to receive the configuration for the game from the lobby creator. 
        updateGameModeAndTime(messageDetails){
          var lobbyID = messageDetails[0];
          if(lobbyID === this.playersLobby){
            this.GameMode = messageDetails[1];
            this.timer = messageDetails[2];
            this.startTime = messageDetails[2];
          }
          this.gameOver = false;
        },
        // Same as the above, except this allows the users to all see the countries to visit. 
        receiveCountriesToVisit(lobbyAndCountries){
            var lobby = lobbyAndCountries[0];
            if(this.playersLobby === lobby && !(this.isLobbyCreator)){
                this.countriesToFind = lobbyAndCountries[1];
            }
        },
        // This is a partial implementation of the RejoinGame logic. This is because the gamemode is decided in the lobby, and other data is required for the MultiPlayerGame.vue component. 
        RejoinGame(MessageDetails){
            this.GameMode = MessageDetails[0];
        },
        // Generic event that is fired each time a change in the lobby users occurs. 
        updateUsers(lobbyDetails){
            var listOfUsers = lobbyDetails[0]
            var lobbyID = lobbyDetails[1]
            if(this.playersLobby === lobbyID){
                this.LobbyUsers = listOfUsers;
            }
        },
        // If player is kicked, this redirects them to the Homepage.
        redirectPlayer(userID){
            if(this.UsersID === userID){
                this.exitToHomePageReset();
            }
        }
    },
    // Data that is required from the HomePageView.vue component. 
    props: {
        playersLobby: {
            type: String,
            required: true
        },
        UsersInLobby: {
            type: Array,
            required: true
        },
        isLobbyCreator: {
            type: Boolean,
            required: true
        },
        UsersID: {
            type: String,
            required: true
        },
        userProfile: {
            type: Object,
            required: true
        },
        userMultiContinue: {
            type: Boolean,
            required: true,
        },
        multiGameDetails: {
            type: Object,
            required: false
        }
    },
    components: {
        MultiPlayerGame
    },
    methods: {
        // These two methods change the gamemode and timer depending on what radio button has been clicked. 
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            this.GameMode = gameModeSelected;
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            this.timer = timeSelected;
        },
        // This method allows the lobby to be closed by the lobby leader. 
        closeLobby(){
            this.$socket.emit('closeLobby', this.playersLobby)
            this.$emit('exitToHomePageReset');
        },
        // Logic for leaving a lobby. Deletes the required player from the LobbyUsers array, and then emits this updated array to the server to go to the other users. 
        leaveGame(){
            var LobbyUsers = this.UsersInLobby;
            for(var i = 0; i < LobbyUsers.length; i++){
                if(LobbyUsers[i].userID === this.UsersID){
                    LobbyUsers.splice(i, i+1)
                }
            }
            this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID)
            this.LobbyPage = false;
            this.MultiPlayer = false;
            this.$emit('exitToHomePageReset');
        },
        // View controller for exiting to the HomePage
        exitToHomePageReset(){
            this.MultiPlayer = false;
            this.LobbyPage = false;
            this.$emit('exitToHomePageReset');
        },  
        // Manipulates the DOM to show the invite player buttons. 
        openInvite(){
            if(this.playerInvite === false){
                this.playerInvite = true;
            }else{
                this.playerInvite = false;
            }
        },
        // Method for inviting a player. Sends an event to the server with the username of the person to be invited. 
        invitePlayer(){
            var inviteUsername = this.$refs.usernameInvite.value;
            this.$socket.emit('playerInvited', inviteUsername, this.UsersID, this.playersLobby);
        },
        // Method for kicking players. Removes the player from the array, then updates this for the lobby creator and other users in the lobby. 
        kickPlayer(userID){
            var newLobbyUsers = this.UsersInLobby.slice();
            for(var i = 0; i < this.UsersInLobby.length; i++){
                if(this.UsersInLobby[i].userID === userID){
                    newLobbyUsers.splice(i, 1);
                }
            }
            this.$socket.emit('playerLeft', newLobbyUsers, this.playersLobby, userID)
            this.$socket.emit('redirectPlayer', userID);
            this.$emit('updateLobbyUsers', newLobbyUsers)
        },
        // Method initiates a multiplayer game, then sends the game details to other lobby users. 
        multiGameInitiated(){
            this.LobbyPage = false;
            this.MultiPlayer = true;
            if(this.isLobbyCreator){
                this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer)
            }
        },
        // Method for clearing the variable responsible for redirecting the user to the gamepage upon rejoining. Ensures the user does not end up stuck in a loop. 
        ClearMultiVariable(){
            this.$emit('ClearMultiVariable');
            console.log("Lobby");
        },
        // Displays the game information for the user, or hides this if it is already displaying.
        displayInformation(){
            this.InformationBox = !(this.InformationBox);
        }
    },
    data(){
        return {
            // Instantiation of variables required for the LobbyView component and any children.
            playerInvite: false,
            show: false,
            MultiPlayer: false,
            LobbyPage: true,
            LobbyUsers: [],

            GameMode: 'Classic',
            timer: 120,
            gameOver: false,
            startTime: 0,

            InformationBox: false,
            ClassicInfo: "In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)",
            BingoInfo: "In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game",
        }
    },
    // Logic that checks if the variable that indicates if a player is still in a multiplayer game is active. If so, skip the lobby page and continue to the Game page, and get the game details. 
    mounted(){
        if(this.userMultiContinue){
            this.LobbyPage = false;
            this.MultiPlayer = true;
            this.$socket.emit('getGameDetails', this.multiGameDetails.playersLobby, this.UsersID)
            console.log("Test 2");
        }
    }
}
</script> 

<style>
div.Players {
    margin-top: 40px;
}
input.textBox {
    width: 100px;
}
label.HelpText {
    color: lightgrey;
    font-size: 10px;
}
li:hover {
    color: red;
}
li.active {
    color: red;
}
</style>