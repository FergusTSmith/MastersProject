<!----------
- The HomePageView.vue file is the component responsible for rendering the homepage. 
- Parents: App.vue
- Children: LeaderBoard.vue, OptionsView.vue, JoinLobby.vue, LobbyView.vue, PassiveMode.vue, SoloLobby.vue
- Due to this file's status as the parent/grandparent of a large part of the program, this file conducts a lot of behind the scenes data instatiation and retrieval, to be passed as props to the child components. 
- 
------------->

<template>
    <div v-if="HomePage">
        <h2>TrackerHunt</h2>
        <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
        <p class="HelpText">Welcome back, {{ UsersID }}!</p>
        <button id="Solo" class="homepageButton" @click="solomode" type="button">Play Solo</button>
        <button id="NewLobby" class="homepageButton" @click="createLobby" type="button">Create Lobby</button>
        <button id="Passive" class="homepageButton" @click="passiveMode" type="button">Passive Mode</button>
        <button id="Lobby" class="homepageButton" @click="joinlobby" type="button">Join Lobby</button>
        <button id="Options" class="homepageButton" @click="options" type="button">Options</button>
        <button id="Leaderboards" class="homepageButton" @click="leaderboards" type="button">LeaderBoards</button>
    </div>

    <!------The below components are the child components rendered by the HomePage -->
    <div v-if="LeaderBoardPage" id = "Leader-Board">
        <LeaderBoard :gamesWon="gamesWon" :gamesPlayed="gamesPlayed" :personalSoloHS="personalSoloHS" :soloClassicLeaderboard="soloClassicLeaderboard" :multiClassicLeaderboard="multiClassicLeaderboard"></LeaderBoard>
        <button @click="exitToHomePage" type="button">HomePage</button>
    </div>

    <div v-if="OptionsPage"  id="Options-Page">
        <OptionsView :UsersID="UsersID" @changeUsername="changeUsername($event)" @passiveMode="passiveMode" @changeUsernamePage="changeUsernamePage" @logout="logout"></OptionsView>
        <button @click="exitToHomePage" type="button">Home Page</button><br/>
    </div>

    <div v-if="JoinLobbyPage" id="Join-Lobby">
        <JoinLobby @enterLobby="enterLobby($event)" @exitToHomePage="exitToHomePage"></JoinLobby>
    </div>

    <div v-if="LobbyPage" id="Lobby">
        <LobbyView :multiGameDetails="multiGameDetails" :userMultiContinue="userMultiContinue" :userProfile="userProfile" :UsersID="UsersID" :playersLobby="playersLobby" :UsersInLobby="UsersInLobby" :isLobbyCreator="isLobbyCreator" @ClearMultiVariable="ClearMultiVariable" @exitToHomePageReset="exitToHomePageReset" @multiGameInitiated="multiGameInitiated" @leaveGame="leaveGame" @updateLobbyUsers="updateLobbyUsers($event)"></LobbyView>
    </div>

    <div v-if="PassivePage">
        <PassiveMode :key="key" :passiveCategoryList="passiveCategoryList" :passiveModeCountries="passiveModeCountries" :totalRequests="totalRequests" :passiveModeTotalTrackers="passiveModeTotalTrackers" :passiveModeUniqueHosts="passiveModeUniqueHosts" :passiveModeTotalCounties="passiveModeTotalCounties" @exitToHomePage="exitToHomePage"></PassiveMode>
    </div>

    <div v-if="SoloPage" id="Solo-Mode">
        <SoloLobby :userSoloContinue="userSoloContinue" :userProfile="userProfile" :personalSoloHS="personalSoloHS" @onGameModeChange="onGameModeChange($event)" @onTimeChange="onTimeChange($event)" @exitToHomePage="exitToHomePage" @resetSoloStatus="resetSoloStatus"></SoloLobby>
    </div>
</template>

<script>
import PassiveMode from '@/components/PassiveMode.vue';
import OptionsView from '@/components/OptionsView.vue';
import JoinLobby from '@/components/JoinLobby.vue';
import LobbyView from '@/components/LobbyView.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import SoloLobby from '@/components/SoloLobby.vue';

export default {
    components: {
        PassiveMode,
        OptionsView,
        JoinLobby,
        LobbyView,
        LeaderBoard,
        SoloLobby
    },
    // These are event listeners for the relevant Socket.IO emissions made by the server.
    sockets: {
        // These two events are in charge of retrieving the Multiplayer and Solo leaderboards from the server.js Socket.IO emission. 
        sendClassicLeaderBoards(MessageDetails){
            this.multiClassicLeaderboard = MessageDetails;
            this.multiClassicLeaderboard = this.multiClassicLeaderboard.slice(0, 11)
            // This logic strips the "Created At" Attribute to just the date. 
            for(var i = 0; i < this.multiClassicLeaderboard.length; i++){
                 this.multiClassicLeaderboard[i].createdAt = this.multiClassicLeaderboard[i].createdAt.toString().substring(0, 10)
                 }
            },
        sendSoloClassic(MessageDetails){
            if(this.UsersID === MessageDetails[1]){
                this.soloClassicLeaderboard = MessageDetails[0];
                for(var i = 0; i < this.soloClassicLeaderboard.length; i++){
                    this.soloClassicLeaderboard[i].createdAt = this.soloClassicLeaderboard[i].createdAt.toString().substring(0, 10)
                }
                this.personalSoloHS = this.soloClassicLeaderboard.filter(item => item.username === this.UsersID);
                this.personalSoloHS = this.personalSoloHS.slice(0, 11);
            }
        },
        // Event fires on the successful connection to a lobby.
        lobbySuccess(lobbyDetails) {
            console.log("Successfully connected to lobby")
            var lobbyID = lobbyDetails[0];
            var listOfUsers = lobbyDetails[1];
            console.log(lobbyID);
            this.playersLobby = lobbyID;
            this.UsersInLobby = listOfUsers;
            this.noOfUsersInLobby++;
            // View Controllers
            this.JoinLobbyPage = false;
            this.HomePage = false;
            this.LobbyPage = true;
            this.lobbyError = false;
            this.allPlayersReady = false; 
        },
        lobbyFailure() {
            console.log("There was an error when attempting to connect to the lobby")
            this.lobbyError = 'Error: Not Able To Connect to Lobby';
        },
        // Logic for responding to an invite from the server to join a lobby
        playerInvitedToLobby(MessageDetails){
            var inviteUsername = MessageDetails[0];
            var invitingUser = MessageDetails[1];
            var lobbyID = MessageDetails[2];
            console.log('Client received the invitation request.')
            // Only show this to the user who is being invited
            if(this.UsersID === inviteUsername){
                var inviteAccepted = confirm("You have been invited to Lobby " + lobbyID + " by user " + invitingUser + ".\n Do you wish to accept?");
                console.log(inviteAccepted);
                if(inviteAccepted){
                    this.enterLobby(lobbyID);
                    this.isLobbyCreator = false;
                }
            }
        },
        // A general event fired whenever a change is made to the users within a lobby. 
        updateUsers(lobbyDetails){
            console.log('we reached updating users')
            var listOfUsers = lobbyDetails[0]
            var lobbyID = lobbyDetails[1]
            console.log(lobbyDetails)
            console.log(this.playersLobby === lobbyID)
            console.log(listOfUsers);
            console.log(this.UsersInLobby);

            if(this.playersLobby === lobbyID){
                this.UsersInLobby = listOfUsers;
                this.noOfUsersInLobby = this.UsersInLobby.length;
                console.log('we updated the users');
                console.log(this.UsersInLobby);
            }
            console.log(listOfUsers)
        },
    },
    // Props that have to be passed from App.vue
    props: {
        UsersID: {
            type: String,
            required: true
        },
        userProfile: {
            type: Object,
            required: true
        },
        gamesPlayed: {
            type: Number,
            required: true,
        },
        gamesWon: {
            type: Number,
            required: true
        },
        UserGoogleID: {
            type: String,
            required: true
        },
        userSoloContinue: {
            type: Boolean,
            required: true
        },
        userMultiContinue: {
            type: Boolean,
            required: true
        },
        multiGameDetails: {
            type: Object,
            required: false,
        }
    },
    data(){
        return {
            // Instantiating the data that is required to be initialised within this component for passing to child components. 
            noOfUsersInLobby:0,
            isLobbyCreator: false,
            playersLobby: '',
            UsersInLobby: [],
            allPlayersReady: false,

            passiveModeHosts: [],
            passiveModeCountries: [],
            passiveModeTotalTrackers: 0,
            passiveModeTotalCounties: 0,
            passiveModeUniqueHosts: 0,
            passiveCategoryList: [],
            achievements: [],
            totalRequests: 0,

            multiClassicLeaderboard: [],
            soloClassicLeaderboard: [],
            personalSoloHS: [],

            JoinLobbyPage: false,
            HomePage: true,
            OptionsPage: false,
            PassivePage: false,

            key: 0,
        }
    },
    methods: {
        // Establishing the methods of this class

        // View Controller for SoloMode
        solomode(){
            this.getHighScores()
            this.HomePage = false;
            this.SoloPage = true;
        },
        // Logic for creating a lobby by generating an ID and then communicating this to the server.
        createLobby(){
            var newLobbyID = this.createNewLobbyID();
            this.LobbyPage = true;
            this.HomePage = false;
            this.isLobbyCreator = true;
            this.playersLobby = newLobbyID;
            this.UsersInLobby[0] = this.userProfile;

            this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);
        },
        // View controller for passive mode. This, also, retrieves the required data structures from Chrome local storage for presentation to the user. 
        passiveMode(){
            var vm = this;
            // The following logic gets and instantiates the passiveHosts, totalRequests, passiveCategoryList, passiveCountryList and achievements.
            chrome.storage.local.get(["passiveHosts"], function(result){
                vm.passiveModeHosts = result.passiveHosts;
                var totalHosts = 0;
                this.key++
                for(var i = 0; i < result.passiveHosts.length; i++){
                    totalHosts += result.passiveHosts[i].count;
                }
                vm.passiveModeTotalTrackers = totalHosts;
                vm.passiveModeUniqueHosts = result.passiveHosts.length;
                this.key++
                chrome.storage.local.get(["totalRequests"], function(result){
                    vm.totalRequests = result.totalRequests;
                    this.key++
                })
                chrome.storage.local.get(["passiveCategoryList"], function(result) {
                    vm.passiveCategoryList = result.passiveCategoryList
                    console.log(vm.PassiveCategoryList);
                })
                chrome.storage.local.get(["passiveCountryList"], function(result){
                vm.passiveModeCountries = result.passiveCountryList;
                vm.passiveModeTotalCounties = result.passiveCountryList.length;
                this.key++
                    chrome.storage.local.get(["achievements"], function(result){
                        vm.achievements = result.achievements;
                        console.log(result);
                        this.key++
                    })
                })
             })      
             this.HomePage = false;
             this.PassivePage = true;
        },
        // View controller for the Join Lobby page
        joinlobby(){
            this.JoinLobbyPage = true;
            this.HomePage = false;
        },
        // View controller for the Options page
        options(){
            this.OptionsPage = true;
            this.HomePage = false;
        },
        // A method for updating the users within the lobby
        updateLobbyUsers(newUsers){
            console.log(newUsers)
            this.UsersInLobby = newUsers;
        },
        // View controller for the LeaderBoard page
        leaderboards(){
            this.getHighScores();
            this.LeaderBoardPage = true;
            this.HomePage = false;
        },
        // Helper method that allows us to generate a random ID for the lobby ID. 
        createNewLobbyID(){
            // Adapted from a StackOverFlow answer at: csharptest.net, "Generate random string/characters in JavaScript", StackOverflow.com, Available at: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript, Accessed 15/06/2022
            var id = ''
            var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for(var i = 0; i < 7; i++){
                 id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
            }
            return id;
        },
        // Method for entering a lobby, sending an event to the server.
        enterLobby(lobbyID){
            this.playersLobby = lobbyID;
            this.$socket.emit('JoinLobby', lobbyID, this.userProfile);
        },
        // Retrieves the leaderboards from the database via the server via Socket.IO emissions.
        getHighScores(){
            this.$socket.emit('retrieveLeaderBoards');
            this.$socket.emit('retreiveSoloScores', this.UsersID);
        },
        // Generic method for returning to the Home Page, used by multiple child components. 
        exitToHomePage(){
            this.HomePage = true;
            this.PassivePage = false;
            this.LeaderBoard = false;
            this.OptionsPage = false;
            this.LobbyPage = false;
            this.LeaderBoardPage = false;
            this.JoinLobbyPage = false;
            this.SoloPage = false;
        },
        // Generic method for returning to the Home Page that also resets the relevant user data. 
        exitToHomePageReset(){
            this.exitToHomePage();
            console.log("Should be at the home screen")
            this.HomePage = true;
        },
        // Allows the user to logout.
        logout(){
            this.HomePage = false;
            this.OptionsPage = false;
            this.$emit('logout');
        },
        // Below methods are for after a user rejoins a game. This clears tha variable responsible for taking the user straight to the game pages, preventing the user from becoming stuck in a loop. 
        resetSoloStatus(){
            this.$emit('resetSoloStatus')
        },
        ClearMultiVariable(){
            this.$emit('ClearMultiVariable')
        },
        // Method for changing username, delegated to App.vue as this controls the UsersID attribute. 
        changeUsername($event){
            this.$emit('changeUsername', $event)
        }
    },
    // Logic occurs before each time the page is re-rendered. This ensures that the user is taken to the correct game page if required, rather than the home page. This also retrieves the high scores before the user attempts to go to the leaderboard, reducing perceived lag. 
    beforeUpdate(){
        this.getHighScores();
        if(this.userSoloContinue){
            this.HomePage = false;
            this.SoloPage = true;
        }
        if(this.userMultiContinue){
            this.UsersInLobby = this.multiGameDetails.LobbyUsers
            this.playersLobby = this.multiGameDetails.playersLobby
            this.noOfUsersInLobby = this.UsersInLobby.length
            this.HomePage = false;
            this.LobbyPage = true;
        }
    },
}
</script>