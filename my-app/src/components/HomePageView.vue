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

    <div v-if="LeaderBoardPage" id = "Leader-Board">
        <LeaderBoard :gamesWon="gamesWon" :gamesPlayed="gamesPlayed" :personalSoloHS="personalSoloHS" :soloClassicLeaderboard="soloClassicLeaderboard" :multiClassicLeaderboard="multiClassicLeaderboard"></LeaderBoard>
        <button @click="exitToHomePage" type="button">HomePage</button>
    </div>

    <div v-if="OptionsPage"  id="Options-Page">
        <OptionsView @passiveMode="passiveMode" @changeUsernamePage="changeUsernamePage" @logout="logout"></OptionsView>
        <button @click="exitToHomePage" type="button">Home Page</button><br/>
    </div>

    <div v-if="JoinLobbyPage" id="Join-Lobby">
        <JoinLobby @enterLobby="enterLobby($event)" @exitToHomePage="exitToHomePage"></JoinLobby>
    </div>

    <div v-if="LobbyPage" id="Lobby">
        <LobbyView :multiGameDetails="multiGameDetails" :userMultiContinue="userMultiContinue" :userProfile="userProfile" :UsersID="UsersID" :playersLobby="playersLobby" :UsersInLobby="UsersInLobby" :isLobbyCreator="isLobbyCreator" @exitToHomePageReset="exitToHomePageReset" @multiGameInitiated="multiGameInitiated" @leaveGame="leaveGame" @updateLobbyUsers="updateLobbyUsers($event)"></LobbyView>
    </div>

    <div v-if="PassivePage">
        <PassiveMode :passiveModeCountries="passiveModeCountries" :totalRequests="totalRequests" :passiveModeTotalTrackers="passiveModeTotalTrackers" :passiveModeUniqueHosts="passiveModeUniqueHosts" :passiveModeTotalCounties="passiveModeTotalCounties" @exitToHomePage="exitToHomePage"></PassiveMode>
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
    
    sockets: {
        sendClassicLeaderBoards(MessageDetails){
        this.multiClassicLeaderboard = MessageDetails;

        this.multiClassicLeaderboard = this.multiClassicLeaderboard.slice(0, 11)

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
        lobbySuccess(lobbyDetails) {
            console.log("successfully connected to lobby")
            var lobbyID = lobbyDetails[0];
            var listOfUsers = lobbyDetails[1];
            console.log(lobbyID);
            this.playersLobby = lobbyID;
            this.UsersInLobby = listOfUsers;
            this.noOfUsersInLobby++;
            this.JoinLobbyPage = false;
            this.HomePage = false;
            this.LobbyPage = true;
            this.lobbyError = false;
            this.allPlayersReady = false; 
        },
        lobbyFailure() {
            console.log("there was an error when attempting to connect to the lobby")
            this.lobbyError = 'Error: Lobby Not Found';
        },
        playerInvitedToLobby(MessageDetails){
            var inviteUsername = MessageDetails[0];
            var invitingUser = MessageDetails[1];
            var lobbyID = MessageDetails[2];
            console.log('Client received the invitation request.')
            if(this.UsersID === inviteUsername){
                var inviteAccepted = confirm("You have been invited to Lobby " + lobbyID + " by user " + invitingUser + ".\n Do you wish to accept?");
                console.log(inviteAccepted);
                if(inviteAccepted){
                    this.enterLobby(lobbyID);
                    this.isLobbyCreator = false;
                }
            }
        },
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
            achievements: [],
            totalRequests: 0,

            multiClassicLeaderboard: [],
            soloClassicLeaderboard: [],
            personalSoloHS: [],

            JoinLobbyPage: false,
            HomePage: true,
            OptionsPage: false,
            PassivePage: false,

        }
    },
    
    methods: {
        solomode(){
            this.getHighScores()
            this.HomePage = false;
            this.SoloPage = true;
        },
        createLobby(){
            var newLobbyID = this.createNewLobbyID();
            this.LobbyPage = true;
            this.HomePage = false;
            this.isLobbyCreator = true;
            this.playersLobby = newLobbyID;
            this.UsersInLobby[0] = this.userProfile;

            this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);
        },
        passiveMode(){
            var vm = this;
            chrome.storage.local.get(["passiveHosts"], function(result){
                vm.passiveModeHosts = result.passiveHosts;

                var totalHosts = 0;

                for(var i = 0; i < result.passiveHosts.length; i++){
                    totalHosts += result.passiveHosts[i].count;
                }

                vm.passiveModeTotalTrackers = totalHosts;
                vm.passiveModeUniqueHosts = result.passiveHosts.length;
                
                chrome.storage.local.get(["passiveCountryList"], function(result){
                vm.passiveModeCountries = result.passiveCountryList;

                vm.passiveModeTotalCounties = result.passiveCountryList.length;

                    chrome.storage.local.get(["achievements"], function(result){
                        vm.achievements = result.achievements;
                        console.log(result);

                        chrome.storage.local.get(["totalRequests"], function(result){
                            vm.totalRequests = result.totalRequests;
                        })
                    })
                })
             })      
             this.HomePage = false;
             this.PassivePage = true;
        },
        joinlobby(){
            this.JoinLobbyPage = true;
            this.HomePage = false;
        },
        options(){
            this.OptionsPage = true;
            this.HomePage = false;
        },
        updateLobbyUsers(newUsers){
            console.log(newUsers)
            this.UsersInLobby = newUsers;
        },
        leaderboards(){
            this.getHighScores();
            this.LeaderBoardPage = true;
            this.HomePage = false;
        },
        createNewLobbyID(){
            /* adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
            var id = ''
            var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for(var i = 0; i < 7; i++){
                 id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
            }
            return id;
        },
        enterLobby(lobbyID){
            this.playersLobby = lobbyID;
            this.$socket.emit('JoinLobby', lobbyID, this.userProfile);
        },
        getHighScores(){
            this.$socket.emit('retrieveLeaderBoards');
            this.$socket.emit('retreiveSoloScores', this.UsersID);
        },
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
        exitToHomePageReset(){
            this.exitToHomePage();

        },
        logout(){
            this.HomePage = false;
            this.OptionsPage = false;
            this.$emit('logout');
        },
        resetSoloStatus(){
            this.$emit('resetSoloStatus')
        }
    },
    beforeUpdate(){
        console.log("Test Home")
        if(this.userSoloContinue){
            console.log("Test 2 passed");
            this.HomePage = false;
            this.SoloPage = true;
        }

        if(this.userMultiContinue){
            console.log("Multi test passed");
            this.UsersInLobby = this.multiGameDetails.LobbyUsers
            this.playersLobby = this.multiGameDetails.playersLobby
            this.noOfUsersInLobby = this.UsersInLobby.length
            this.HomePage = false;
            this.LobbyPage = true;
        }
    },
    created(){
        this.getHighScores();
    }
}
</script>