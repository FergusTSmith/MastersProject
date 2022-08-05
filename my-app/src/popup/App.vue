<script setup>
import { ref } from 'vue';
//import BaseTimer from "../components/BaseTimer";
import IntroPage from '@/components/IntroPage.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import OptionsView from '@/components/OptionsView.vue';
import UsernameChange from '@/components/UsernameChange.vue';
import SetUsername from '@/components/SetUsername.vue';
//import SetUsername from '@/components/SetUsername.vue';
import LobbyView from '@/components/LobbyView.vue'
import PassiveMode from '@/components/PassiveMode.vue'
import AchievementsView from '@/components/AchievementsView.vue'
import HostsView from '@/components/HostsView.vue'
import SoloLobby from '@/components/SoloLobby.vue';
import JoinLobby from '@/components/JoinLobby.vue';
import CountryView from '@/components/CountryView.vue';
import SoloGamePage from '@/components/SoloGamePage.vue';
import MultiPlayerGame from '../components/MultiPlayerGame.vue';
</script>

<template>
<div id="app" :key="componentVersion">
  <div v-if="IntroPage" id="Intro-Page" ref="Intro-Page">
      <IntroPage @userLogin="googleLogin($event)" :userInASoloGame="userInASoloGame" :userInAMultiGame="userInAMultiGame"></IntroPage>
  </div>

  <div v-if="HomePage" id = "Home-Page">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <p class="HelpText" v-if="userSignedIn">Welcome back, {{ UsersID }}!</p>
    <button @click="solomode" type="button">Play Solo</button><br/>
    <button @click="createLobby" type="button">Create Lobby</button>
    <button @click="joinlobby" type="button">Join Lobby</button><br/>
    <button @click="options" type="button">Options</button>
    <button @click="leaderboards" type="button">LeaderBoards</button>
    <button v-if="userInAMultiGame || userInASoloGame" @click="RejoinGame">Rejoin Your Game</button>
  </div>

  <div v-if="LeaderBoardPage" id = "Leader-Board">
    <LeaderBoard :gamesWon="gamesWon" :gamesPlayed="gamesPlayed" :personalSoloHS="personalSoloHS" :soloClassicLeaderboard="soloClassicLeaderboard" :multiClassicLeaderboard="multiClassicLeaderboard"></LeaderBoard>
    <button @click="exitToHomePage" type="button">HomePage</button>
  </div>

  <div v-if="OptionsPage"  id="Options-Page">
    <OptionsView @passiveMode="passiveMode" @changeUsernamePage="changeUsernamePage"></OptionsView>
    <button @click="exitToHomePage" type="button">Home Page</button><br/>
  </div>

  <div v-if="UsernameChangePage" id="UsernameChangePage">
    <UsernameChange :UsersID="UsersID" @changeUsernamePage="changeUsernamePage" @exitToHomePage="exitToHomePage"></UsernameChange>
  </div>

  <div v-if="JoinLobbyPage" id="Join-Lobby">
    <JoinLobby @enterLobby="enterLobby($event)" @exitToHomePage="exitToHomePage"></JoinLobby>
  </div>
    
  <div v-if="UsernamePage" id="UsernamePage">
    <SetUsername @setUsername="setUsername($event)" @usernameToIntro="usernameToIntro"></SetUsername>
  </div>


  <div v-if="LobbyPage" id="Lobby">
    <LobbyView :UsersID="UsersID" :playersLobby="playersLobby" :UsersInLobby="UsersInLobby" :isLobbyCreator="isLobbyCreator" @onGameModeChange="onGameModeChange($event)" @onTimeChange="onTimeChange($event)" @exitToHomePageReset="exitToHomePageReset" @multiGameInitiated="multiGameInitiated" @leaveGame="leaveGame"></LobbyView>
  </div>

  <div v-if="PassivePage">
    <PassiveMode :passiveModeTotalTrackers="passiveModeTotalTrackers" :passiveModeUniqueHosts="passiveModeUniqueHosts" :passiveModeTotalCounties="passiveModeTotalCounties" @PassiveToHost="PassiveToHost" @PassiveToCountry="PassiveToCountry" @achievementPage="achievementPage" @exitToHomePage="exitToHomePage"></PassiveMode>
  </div>

  <div v-if="AchievementPage">
    <AchievementsView :achievements="achievements" @backToPassive="backToPassive" @exitToHomePage="exitToHomePage"></AchievementsView>
  </div>

  <div v-if="HostPage">
    <HostsView :passiveModeHosts="passiveModeHosts" @exitToHomePage="exitToHomePage" @HostToPassive="HostToPassive"></HostsView>
  </div>

  <div v-if="CountryPage">
    <CountryView :passiveModeCountries="passiveModeCountries" @exitToHomePage="exitToHomePage" @CountToPassive="CountToPassive"></CountryView>
  </div>

  <div v-if="SoloPage" id="Solo-Mode">
    <SoloLobby :personalSoloHS="personalSoloHS" @onGameModeChange="onGameModeChange($event)" @onTimeChange="onTimeChange($event)" @exitToHomePage="exitToHomePage" @soloGameInitiated="soloGameInitiated()"></SoloLobby>
  </div>

  <div v-if="SoloGame" id="Solo-Game" :key="componentVersion">
    <SoloGamePage @gameSetup="gameSetup" @endGame="endGame" @exitToHomePageReset="exitToHomePageReset" :categoryList="categoryList" :timer="timer" :GameMode="GameMode" :gameOver="gameOver" :timeLeft="timeLeft" :startTime="startTime"  :userScore="userScore" :VisitedCountries="VisitedCountries" :numberOfCookies="numberOfCookies" :countriesToFind="countriesToFind" :finishedGame="finishedGame" :APIEnabled="APIEnabled"></SoloGamePage>
  </div>

  <div v-if="MultiPlayer" id="Multiplayer-Game" :key="componentVersion">
    <MultiPlayerGame @playerReady="playerReady" @leaveGame="leaveGame" @gameSetup="gameSetup" @endGame="endGame" @exitToHomePageReset="exitToHomePageReset" :noOfCountriesBingo="noOfCountriesBingo" :didYouWin="didYouWin" :noOfCountries="noOfCountries" :WinningUser="WinningUser" :isLobbyCreator="isLobbyCreator" :UsersInLobby="UsersInLobby" :gameStarted="gameStarted" :allPlayersReady="allPlayersReady" :categoryList="categoryList" :timer="timer" :GameMode="GameMode" :gameOver="gameOver" :timeLeft="timeLeft" :startTime="startTime"  :userScore="userScore" :VisitedCountries="VisitedCountries" :numberOfCookies="numberOfCookies" :countriesToFind="countriesToFind" :finishedGame="finishedGame" :APIEnabled="APIEnabled"></MultiPlayerGame>
  </div>



</div>
</template>

<script>
//var countryList = chrome.storage.local.get[["countryList"]];


export default {
  // https://manage.auth0.com/dashboard/eu/dev-li-9809u/applications/s449g7DqINXUA9dZNRPdVTwPswnMX9qJ/quickstart
    sockets: {
      connect() {
        console.log('no worries, goose');
      },
      disconnect() {
        console.log("socket has been disconnected")
      },
      testMessage(){
        console.log('test passed')
      },
      UserNotFound(){
          this.UsernamePage = true;
          this.IntroPage = false;
      },
      endBingoModeGame(lobbyAndUser){
          var lobby = lobbyAndUser[0];
          var counter = 0;

          for(var i = 0; i < this.countriesToFind.length; i++){
            if(this.countriesToFind[i].found === true){
              counter++
            }
          }
          this.noOfCountriesBingo = counter;

          console.log(this.playersLobby === lobby);
          console.log(lobbyAndUser);

          if((this.playersLobby === lobby) && (this.UsersID != lobbyAndUser[1])){
            this.WinningUser = lobbyAndUser[1];
            this.gameOver = true;
            this.didYouWin = false;
          }
      },
      receiveCountriesToVisit(lobbyAndCountries){
        var lobby = lobbyAndCountries[0];
        console.log(lobbyAndCountries)
        
        if(this.playersLobby === lobby && !(this.isLobbyCreator)){
          this.countriesToFind = lobbyAndCountries[1];
        }
      },
      UserFound(users){
          console.log(users);
          this.UsernamePage = false;
          this.HomePage = true;
          this.IntroPage = false;

          this.getUserDetails(users[0].googleID);
          console.log(users);

          this.UsersID = users[0].username;
          this.UserGoogleID = users[0].googleID;
          this.userProfile = new User(this.UsersID);
          this.userProfile.googleID = this.UserGoogleID;

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
        //this.$socket.join(lobbyID)
        this.lobbyError = false;
        this.allPlayersReady = false; 
      },
      lobbyFailure() {
        console.log("there was an error when attempting to connect to the server")
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
          }
        }
      },
      startGame(lobbyID){
        if(lobbyID === this.playersLobby){
          this.initiateGame();
        }
      },
      updateGameModeAndTime(messageDetails){
          var lobbyID = messageDetails[0];

          if(lobbyID === this.playersLobby){
            this.GameMode = messageDetails[1];
            this.timer = messageDetails[2];
            this.startTime = messageDetails[2];
          }
          this.gameOver = false;

      },
      player_leave_message(messageDetails){
          this.playerLeaveMessage = "User: " + messageDetails + " has disconnected from the lobby."
          if(this.UsersInLobby.length === 1){
            this.playerLeaveMessage += "You are the only player in this multiplayer game."
          }
          console.log(this.playerLeaveMessage)

          if(messageDetails === this.UsersID){
            this.SoloGame = false;
            this.HomePage = true;
            this.LobbyPage = false;
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
      player_is_ready(lobbyDetails){
        var allReady = true;
        var user = lobbyDetails[0];
        var lobbyID = lobbyDetails[1];

        if(lobbyID === this.playersLobby){
          for(var i = 0; i < this.noOfUsersInLobby; i++){
            console.log(this.UsersInLobby[i]);
            if(this.UsersInLobby[i].userID === user.userID){
              this.UsersInLobby[i].ready = "Ready";
            }
            if(this.UsersInLobby[i].ready != "Ready"){
              allReady = false;
            }
          }
        }
        if(allReady){
          this.allPlayersReady = true;
        }
        console.log(allReady)
      },
      removePlayerFromLobby(user, lobbyID){
        if(this.playersLobby === lobbyID){
          for(var i = 0; i < this.noOfUsersInLobby; i++){
            if(this.UsersInLobby[i] === user){
              for(var j = i; j < this.noOfUsersInLobby-1; j++){
                this.UsersInLobby[i] = this.UsersInlobby[i+1]
              }
              this.UsersInLobby[this.noOfUsersInLobby--] = undefined;
            }
          }
        }
      },
      sendClassicLeaderBoards(MessageDetails){
        this.multiClassicLeaderboard = MessageDetails;
        console.log(MessageDetails)
        console.log(this.multiClassicLeaderboard);

        this.multiClassicLeaderboard = this.multiClassicLeaderboard.slice(0, 11)

        for(var i = 0; i < this.multiClassicLeaderboard.length; i++){
          this.multiClassicLeaderboard[i].createdAt = this.multiClassicLeaderboard[i].createdAt.toString().substring(0, 10)
        }
      },
      sendSoloClassic(MessageDetails){
        if(this.UsersID === MessageDetails[1]){
          this.soloClassicLeaderboard = MessageDetails[0];
          console.log('test fired')

          for(var i = 0; i < this.soloClassicLeaderboard.length; i++){
          this.soloClassicLeaderboard[i].createdAt = this.soloClassicLeaderboard[i].createdAt.toString().substring(0, 10)
          }

          

          this.personalSoloHS = this.soloClassicLeaderboard.filter(item => item.username === this.UsersID);
          this.personalSoloHS = this.personalSoloHS.slice(0, 11);
          console.log(this.personalSoloHS)
        }
        console.log(MessageDetails)
      },
      sendUserDetails(MessageDetails){
        console.log(MessageDetails);
        this.gamesPlayed = MessageDetails[0].gamesPlayed;
        this.gamesWon = MessageDetails[0].wonGames
        console.log(this.gamesPlayed);
        console.log(this.gamesWon);
      },
      nameAvailable(MessageDetails){
        console.log(MessageDetails)
        this.UsersID = MessageDetails;

        this.$socket.emit('newUser', this.UsersID, this.UserGoogleID);

        this.userProfile = new User(this.UsersID);
        this.userProfile.userID = this.UsersID;

        this.UsernamePage = false;
        this.HomePage = true;
        this.getUserDetails(this.UserGoogleID);
      },
      nameUnavailable(MessageDetails){
        console.log(MessageDetails);
        console.log("Error: Name " + MessageDetails + " is already in use");
        alert("Error: Name " + MessageDetails + " is already in use");
      },
      UserInMultiplayer(MessageDetails){
        console.log(MessageDetails);
        this.userInAMultiGame = true;

        this.playersLobby = MessageDetails[0];
        this.UsersInLobby = MessageDetails[1];

        this.$socket.emit('getGameDetails', this.playersLobby, this.UsersID)

      },
      sendGameDetails(MessageDetails){
        console.log(MessageDetails);
        console.log(this.playersLobby)
        if(this.playersLobby === MessageDetails[0] && this.UsersID != MessageDetails[1]){
          this.$socket.emit('sendingGameDetails', this.GameMode, this.timer, this.UsersInLobby, this.playersLobby, this.UsersID)
          console.log('should have sent the details by now!')
        }
        console.log(MessageDetails)
      },
      RejoinGame(MessageDetails){
        if(this.UsersID != MessageDetails[4]){
          this.GameMode = MessageDetails[0];
          this.timer = MessageDetails[1];
          this.UsersInLobby = MessageDetails[3]

          this.updateUsers(MessageDetails[5]);

          if(this.GameMode === "Classic"){
            chrome.storage.local.get(["backupCountryList"], function(result){
              vm.VisitedCountries = result;
            })
          }

          this.gameStarted = true;
          this.HomePage = false;
          this.MultiPlayer = true;


        }
      }
    },
  data(){
    return {
      LoginPage: false,
      IntroPage: true,
      PasswordPage: false,
      RegistrationPage: false,
      HomePage: false,
      LeaderBoardPage: false,
      OptionsPage: false,
      JoinLobbyPage: false,
      LobbyPage: false,
      SoloPage: false,
      UsernamePage: false,
      SoloGame: false,
      UsernameChangePage: false,
      PassivePage: false,
      HostPage: false,
      CountryPage: false,
      AchievementPage: false,
      MultiPlayer: false,

      playersLobby: '',
      UsersID: '1234',
      UserGoogleID: '',
      VisitedCountries: [],
      gameStarted: false,
      gameOver: false,
      noOfCountries: 0,
      userProfile: undefined,
      WinningUser: undefined,
      didYouWin: false,
      isLobbyCreator: false,

      UsersInLobby: [],
      noOfUsersInLobby: 0,
      userScore: 0,
      allPlayersReady: false,
      lobbyError: '',

      componentVersion: 0,
      componentKey: 0,

      allUserIDs: [],
      allUsers: [],

      GameMode: 'Classic',
      finishedGame: false,

      numberOfCookies: 0,

      categoryList: [],

      userLeaveMessage: "",

      passiveModeHosts: [],
      passiveModeCountries: [],
      passiveModeTotalTrackers: 0,
      passiveModeTotalCounties: 0,
      passiveModeUniqueHosts: 0,
      achievements: [],


      gamesPlayed: 0,
      gamesWon: 0,


      easyCountries: ["United States", "United Kingdom"],
      medEasyCountries: ["Canada", "Ireland", "Germany", "Netherlands", "Belgium"],
      hardCountries: ["Russia"],
      //countriesIveFoundBeforeAndShouldIncludeAbove: ["Canada", "United Kingdom", "United States", "Germany", "Netherlands", "Ireland", "Belgium"],
      countriesToFind: [],
      noOfCountriesBingo: 0,

      soloClassicLeaderboard: [],
      intSoloClassLB: [],
      multiClassicLeaderboard: [],
      intMultiClassLB: [],
      personalSoloHS: [],

      MultiClassicLB: false,
      MultiBingoLB: false,
      SoloClassicLB: false,
      SoloBingoLB: false,

      userInASoloGame: false,
      userInAMultiGame: false,

      timer: 120,
      startTime: 120,
      timerClose: false,

      userSignedIn: false,

      // Dev Variables

      APIEnabled: false,

      //Emoji Object
      }
    },
    props: {
      timeToGo: {
        type: Number,
        required: true
      }
    },
    components: {
      //BaseTimer,
      IntroPage,
      LeaderBoard,
      OptionsView,
      UsernameChange,
      SetUsername,
      LobbyView,
      PassiveMode,
      AchievementsView,
      HostsView,
      SoloLobby,
      JoinLobby,
      CountryView,
      SoloGamePage
    },
    
    
    // Adapted from https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js
    watch: {
      timer: {
        handler(value) {
          if(value > 0 && this.gameStarted){
            setTimeout(() => {
              this.timer--;
              this.timePased++;
            }, 1000);
          }else if(value <= 10 && value > 1){
              this.timerClose = true;
          }else if(value === 0){
            this.endGame()
            if(this.GameMode === 'Bingo'){
              this.endBingoGame();
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      getHighScores(){
        this.$socket.emit('retrieveLeaderBoards');
        this.$socket.emit('retreiveSoloScores', this.UsersID);
      },
      getUserDetails(userGoogleID){
        this.$socket.emit('retrieveDetails', userGoogleID)
        this.gameStarted = false;
      },
      initiateGame(){
        var vm = this;
        this.gameStarted = true;
        this.startTime = this.timer;
        if(this.timer <= 0){
          this.timer = 120;
          this.startTime = this.timer;
        }
        this.numberOfCookies = 0;

        this.timer = this.timer * 1;
        this.timer -= 1;
        chrome.runtime.sendMessage({ message: 'reset'}, function(response) {
          if(response === 'success'){
            console.log('successfully started the game.')
            vm.VisitedCountries = [];
            vm.userScore = 0;
            vm.numberOfCookies = 0;
          }
          return true;
        })
 
        /*
        
        chrome.storage.local.get(["countryList"], function(result){
            let score = 0;
            if(!(result == undefined)){
              for(var i = 0; i < result.countryList.length; i++){
                score += result.countryList[i].count;
              }
            }
            vm.userScore = score;
            vm.userProfile.score = score;
            vm.VisitedCountries = result.countryList;
            vm.noOfCountries = result.countryList.length;
        })

        */
        if(this.GameMode === "Bingo"){
            this.countriesToFind = [];
            this.countriesToFind.push({country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)], found: false})
            this.countriesToFind.push({country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)], found: false})
            this.countriesToFind.push({country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)], found: false})

            console.log(this.countriesToFind);
            this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind)

        }

        chrome.storage.onChanged.addListener(function(result) {
            if(!(vm.gameOver)){
              vm.updateListOfCountries()
              vm.updateAchievements()
              vm.updateCategories()
              //console.log(vm.GameMode)
              if(vm.GameMode === "Classic"){
                vm.updateScoreClassic()
              }else if(vm.GameMode === "Bingo"){
                vm.updateScoreBingo()
              }
              vm.VisitedCountries = result.countryList.newValue;
              vm.gameStarted = true;
            }
        }) 

          /* chrome.windows.create({
            url: 'https://www.google.com',
          }) */
      },generateRandomIntHelper(max){
          return Math.floor(Math.random() * max)

          //Nabbed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      },

      onGameModeChange(gameMode){
        this.GameMode = gameMode;
      },

      onTimeChange(timeSelected){ // https://www.codecheef.org/article/how-to-get-selected-radio-button-value-in-vuejs
        this.timer = timeSelected;
      },
      HostToPassive(){
        this.HostPage = false;
        this.PassivePage = true;
      },
      CountToPassive(){
        this.CountryPage = false;
        this.PassivePage = true;
      },
      PassiveToHost(){
        this.PassivePage = false;
        this.HostPage = true;
      },
      PassiveToCountry(){
        this.PassivePage = false;
        this.CountryPage = true;
      },
      changeUsernamePage(){
          this.OptionsPage = false;
          this.UsernameChangePage = true;
      },
      achievementPage(){
        this.AchievementPage = true;
        this.PassivePage = false;
      },
      backToPassive(){
        this.AchievementPage = false;
        this.PassivePage = true;
      },

      changeUsername(newUsername){

          this.UsersID = newUsername
          this.userProfile.userID = this.UsersID;
          this.exitToHomePage();
          console.log(this.UserGoogleID)

          this.$socket.emit('newUsername', this.UserGoogleID, this.UsersID)
      },
      leaveGame(){
        console.log(this.UsersInLobby)
        for(var i = 0; i < this.UsersInLobby.length; i++){
          if(this.UsersInLobby[i].userID === this.UsersID){
            this.UsersInLobby.splice(i, i+1)
            console.log("Player deleted")
            console.log(this.UsersInLobby)
          }
        }
        this.userInAMultiGame = false;
        this.userInASoloGame = false;

        this.$socket.emit('playerLeft', this.UsersInLobby, this.playersLobby, this.UsersID)
        console.log('we reached here');
        this.playersLobby = '';
        this.isLobbyCreator = false;
        this.exitToHomePageReset();
      },
      endGame(){
        var winningScore = 0;
        //const vm = this;

        if(this.MultiPlayer){
          for(var i = 0; i < this.noOfUsersInLobby; i++){
          if(this.UsersInLobby[i].score >= winningScore){
            winningScore = this.UsersInLobby[i].score;
            var winningUser = this.UsersInLobby[i].userID;
            }
          }
        }else{
          winningUser = this.UsersID
        } 
        this.WinningUser = winningUser;
        var timePassed = this.startTime - this.timer;

        console.log(timePassed)
        this.finishedGame = true;
        this.userInAMultiGame = false;
        this.userInASoloGame = false;

        if(this.GameMode === "Classic"){
          this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, this.userScore, (this.MultiPlayer === true), this.startTime)
        }else if(this.GameMode === "Bingo"){
          for(var j = 0; j < this.countriesToFind.length; j++){
              if(this.countriesToFind[i].found != true){
                this.finishedGame = false;
                console.log('unfinished')
              }
          }
          if(this.finishedGame){
            this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, timePassed, (this.MultiPlayer === true), this.startTime)
            console.log('sent bingo score to the server');
          }
        }

        console.log(this.WinningUser);
        console.log(this.UsersID);
        console.log(this.UserGoogleID);

        if(this.WinningUser === this.UsersID && (this.MultiPlayer === true)){
          this.didYouWin = true;
          console.log("Winning game won test passed");

          // This is here to make sure this is only fired once per game, by the winner
          this.$socket.emit('gameWon', this.UserGoogleID)
        }

        //Close the Lobby
        this.$socket.emit('closeLobby', this.playersLobby)
        this.gameOver = true;

        if(this.GameMode === 'Bingo'){
          this.endBingoGame();
        }

        //this.reset();

      },
      endBingoGame(){

        this.didYouWin = true;
        if(this.MultiPlayer){
          this.$socket.emit('endBingoGame', this.playersLobby, this.UsersID)
          this.$socket.emit('closeLobby', this.playersLobby)
        }
        
        var didUserWin = true;
        for(var i = 0; i < this.countriesToFind.length; i++){
          if(this.countriesToFind[i].found === false){
            didUserWin = false;
            
          }
        }

        if(didUserWin){
          this.WinningUser = this.UsersID
          this.didYouWin = true;
          this.noOfCountriesBingo = this.countriesToFind.length;
        }

        console.log(this.noOfCountriesBingo)

        this.gameOver = true;
        this.reset();
      },
      playerReady(){
          this.userProfile.ready = "Ready";
          for(var i = 0; i< this.noOfUsersInLobby; i++){
            if(this.UsersInLobby[i].userID === this.userProfile.userID){
              this.UsersInLobby[i].ready = "Ready";
            }
          }

          this.$socket.emit('playerReady', this.userProfile, this.playersLobby);
      },
      
      get_updated_countries(){
        chrome.storage.local.get(["countryList"], function(result){
          console.log(result.countryList);
          console.log(this.VisitedCountries);
          
        })
     },
     updateAchievements(){
       var vm=this;
       chrome.storage.local.get(["achievements"], function(result){
            vm.achievements = result.achievements;
          })
     },
     updateCategories(){
      var vm = this;
      chrome.storage.local.get(["categoryList"], function(result){
          vm.categoryList = result.categoryList;
      })
     },

     updateListOfCountries(){
        var vm = this;
        
        chrome.storage.local.get(["countryList"], function(result){
          vm.VisitedCountries = result.countryList;
          console.log(vm.VisitedCountries)

          chrome.storage.local.get(["numberOfCookies"], function(result){
            vm.numberOfCookies = result;
            //console.log(vm.numberOfCookies);
          })
          chrome.storage.local.get(["achievements"], function(result){
            vm.achievements = result.achievements;
          })
        })

        chrome.storage.local.set({backupCountryList: vm.VisitedCountries});
     },
     passiveMode(){
        var vm = this;
        
        chrome.storage.local.get(["passiveHosts"], function(result){
          vm.passiveModeHosts = result.passiveHosts;
          console.log(vm.passiveModeHosts);

          var totalHosts = 0;

          for(var i = 0; i < result.passiveHosts.length; i++){
            totalHosts += result.passiveHosts[i].count;
          }

          vm.passiveModeTotalTrackers = totalHosts;
          vm.passiveModeUniqueHosts = result.passiveHosts.length;
        })

        chrome.storage.local.get(["passiveCountryList"], function(result){
          vm.passiveModeCountries = result.passiveCountryList;
          console.log(vm.passiveModeCountries);

          vm.passiveModeTotalCounties = result.passiveCountryList.length;
        })

        chrome.storage.local.get(["achievements"], function(result){
            vm.achievements = result.achievements;
            console.log(result);
        })

        this.HomePage = false;
        this.OptionsPage = false;
        this.PassivePage = true;

        console.log(this.passiveModeCountries);
        console.log(this.passiveModeHosts)

     }, 

     updateScoreClassic(){
        console.log('Updating score');
        
        var vm = this;

        chrome.storage.local.get(["countryList"], function(result){
            let count = ref(0);
            let score = 0;
            for(var i = 0; i < result.countryList.length; i++){
                count.value += result.countryList[i].count;
                if(vm.easyCountries.includes(result.countryList[i].name)){
                    score += result.countryList[i].count;
                }else if(vm.medEasyCountries.includes(result.countryList[i].name)){
                    score += (result.countryList[i].count)*2;
                }else if(vm.hardCountries.includes(result.countryList[i])){
                    score += (result.countryList[i].count)*3
                }else{
                    score += (result.countryList[i].count)*4
                }
            }
            vm.noOfUsersInLobby = vm.UsersInLobby.length;
            vm.userScore = score;
            vm.userProfile.score = score;
            vm.noOfCountries = result.countryList.length;

            for(var j = 0; j < vm.noOfUsersInLobby; j++){
              if(vm.userProfile.userID === vm.UsersInLobby[j].userID){
                vm.UsersInLobby[j].score = score;
              }
            }
          })
        
        if(this.MultiPlayer){
            this.$socket.emit('scoreUpdate', this.userProfile, this.playersLobby, this.userScore);
        }

     },
     updateScoreBingo(){
        var vm = this;

        chrome.storage.local.get(["countryList"], function(result){
            //console.log(result.countryList)

            for(var i = 0; i < result.countryList.length; i++){

                for(var j = 0; j < vm.countriesToFind.length; j++){
                  if(result.countryList[i].name === vm.countriesToFind[j].country){
                    vm.countriesToFind[j].found = true;
                    //console.log(vm.countriesToFind[j]);
                  }
                }
            }
            vm.noOfCountries = result.countryList.length;
        })

        var allFound = true;
        setTimeout(() => {console.log('done waiting'), 2000})
        console.log(this.countriesToFind)

        for(var j = 0; j < this.countriesToFind.length; j++){
            if(this.countriesToFind[j].found != true){
              allFound = false;
            }else if(!(this.userProfile.BingoCountries.includes(this.countriesToFind[j])) && this.countriesToFind[j].found === true){
              this.userProfile.BingoCountries.push(this.countriesToFind[j])
            }
            console.log(this.countriesToFind[j].found)
        }

        console.log(allFound);
        console.log(this.userProfile.BingoCountries)
        console.log(this.userProfile.BingoCountries.length)
        console.log(this.MultiPlayer)
        this.noOfCountriesBingo = this.userProfile.BingoCountries.length;

        if(this.MultiPlayer){
          this.$socket.emit('bingoScoreUpdate', this.userProfile, this.playersLobby)
        }

        if(allFound){
          this.endBingoGame();
          this.didYouWin = true;
          this.WinningUser = this.userProfile.userID
        }
     },
     gameSetup(){ 
        if(this.allPlayersReady){
          this.$socket.emit('startTheGame', this.playersLobby)
          this.userInAMultiGame = true;
        }else if(this.MultiPlayer === false){
          this.initiateGame();
          this.userInASoloGame = true;
        }
     },
     
     googleLogin(googleID){
        var vm = this;
        this.getHighScores();
        this.userSignedIn = true;
        vm.IntroPage = false;
        vm.UserGoogleID = googleID;
         
     },
     getGoogleID(){
        var vm = this;
          chrome.runtime.sendMessage({ message: 'googleID'}, function(response){
            if((response === '') || (response === undefined)){
              console.log("No google ID found");
              return '';
            }else{
              var googleID = response;
              console.log(googleID);
              googleID = googleID.substring(0, 255);
              vm.UserGoogleID = googleID;

              console.log('test + ' + vm.UserGoogleID);
              return googleID;
            }
         })
     },
     setUsername(UsersID){

        if(UsersID === ''){
          alert("Please enter a name")
        }else{
          this.$socket.emit('nameTaken', UsersID)
        }
        },
     soloGameInitiated(){
        this.gameOver = false;
        this.SoloPage = false;
        this.SoloGame = true;
        this.userInASoloGame = true;

        console.log(this.GameMode)
        console.log(this.timer);
     },
     multiGameInitiated(){
        this.countriesToFind = [];
        this.gameOver = false;
        this.LobbyPage = false;
        this.MultiPlayer = true; 
        this.userInAMultiGame = true;

        if(this.isLobbyCreator){
           this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer)
          }
        

     },
     
     usernameToIntro(){
      this.UsernamePage = false;
      this.IntroPage = true;
     },
     
     NoAccount(){
      this.IntroPage = false;
      this.NoLoginPage = true;
     },
     
     closeLobby(){
        this.$socket.emit('closeLobby', this.playersLobby)
        this.exitToHomePageReset();
     },
     
     enterLobby(lobbyID){
      this.playersLobby = lobbyID;
      this.$socket.emit('JoinLobby', lobbyID, this.userProfile);
    },
    introToLogin(){
      this.LoginPage = true
      this.IntroPage = false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
    },
    loginToIntro(){
      this.LoginPage = false;
      this.IntroPage = true;
    },
    loginPageChange(){
      this.LoginPage = false;
      this.HomePage = true;
    },
    solomode(){
      this.getHighScores();
      this.HomePage = false;
      this.SoloPage = true;
    },
    leaderboards(){
      this.getHighScores();
      this.LeaderBoardPage = true;
      this.HomePage = false;
    },
    joinlobby(){
      this.JoinLobbyPage = true;
      this.HomePage = false;
    },
    options(){
      this.OptionsPage = true;
      this.HomePage = false;
    },
   
    createLobby(){
      var newLobbyID = this.createNewLobbyID();
      this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);
      this.noOfUsersInLobby = 0;

      this.playersLobby = newLobbyID;
      this.UsersInLobby[this.noOfUsersInLobby++] = this.userProfile;
      
      this.LobbyPage = true;
      this.HomePage = false;
      this.isLobbyCreator = true;
    },
    exitToHomePage(){
      this.LobbyPage = false;
      this.JoinLobbyPage = false;
      this.LeaderBoardPage = false;
      this.SoloPage = false;
      this.OptionsPage = false;
      this.HomePage = true;
      this.SoloPage = false;
      this.SoloGame = false;
      this.MultiPlayer = false;
      this.UsernameChangePage = false;
      this.PassivePage = false;
      this.HostPage = false;
      this.CountryPage = false;
      this.AchievementPage = false;

      this.gameStarted = false;
    },
    exitToHomePageReset(){
      this.reset();
      this.exitToHomePage();
    },
    reset(){
      this.isLobbyCreator = false;
      this.userProfile.ready = "Not Ready";
      this.userProfile.BingoCountries = [];
      this.UsersInLobby = [];
      this.userScore = 0;
      this.timer = 0;
      this.allPlayersReady = false;
      this.didYouWin = false;
      this.WinningUser = '';
      this.VisitedCountries = [];
      this.noOfUsersInLobby = 0;
      this.gameStarted = false;
      this.userLeaveMessage = "";
      this.countriesToVisit = [];
      this.noOfCountriesBingo = 0;
    },
    createNewLobbyID(){
     /* adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
     var id = ''
    var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < 7; i++){
      id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }
    return id;
    
    }
}}


// Class Helpers:

class User {
  constructor(userID){
    this.userID = userID;
    this.score = 0;
    this.ready = "Not Ready";
    this.googleID = '';
    this.BingoCountries = [];
  }
}

</script>

<style>
/* Cormac's code but adjusted: */
@font-face {
    font-family: 'digitalFont';
    src: url('./fonts/digital-7.ttf');
}

/* https://vuejs.org/guide/built-ins/transition.html#css-based-transitions */

.v-enter-active,
.v-leave-active{
  transition: opacity 5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;

}

li{
  color: white;
  /*display: flex;*/
}
li.TrackedCountry{
  color: white;
  font-size: smaller;
  list-style: none;
}

.found {
  color: green;
}

.timerClose {
  color: red;
}

li.LobbyUsers{
  color: white;
  font-size: smaller;
  list-style: none;
  font-style: italic;
}
li.GameUsers{
  list-style: none;
}

li.BingoList{
  color: white;
  font-size: x-small;
  list-style: none;
  font-style: italic;
  display: flex;
}

p{
  color: white;
}
p.PassiveText{
  color: white;
  font-size: small;
  font-style: none;
  display: flex;
}
p.TinyText{
  color: white;
  font-size: 7px;
  font-style: italic;
}

p.CountryText {
  color: white;
  font-size: 13px;
}

p.CookieText {
  font-size: 10px;
}
p.CategoryText {
  font-size: 12px;
}

p.EndScreenText {
  font-size: 10px;
}

#timer {
  color: white;
}
#timerClose {
  color: red;
}
.timerClose {
  color: red;
}

label {
  color: white;
}
h5{
  color: white;
}

div {
  text-align: center;
}

div.GameResults {
  width: 100%;
}

div.TimerSection {
  align-self: center;
}
div.ClassicGameMode {
  height: 380px;
  width: 100%;
  max-height: 380px;
  display: inline-block;
}

div.EndScreenText {
  display: flex;
  min-height: 300px;
}

/* Style below adapted from this tutorial: https://markheath.net/post/customize-radio-button-css https://codepen.io/phusum/pen/VQrQqy */

div.RadioButtons{
  width: 200px;
  height: 30px;
}

div.RadioButtons input[type="radio"] {
  opacity: 0.011;
  /*z-index: 100;*/
  position: fixed;
  width: 0;
}

div.RadioButtons input[type="radio"]:checked + label {
  background: #20C20E;
  border-radius: 4px;
}
div.RadioButtons label {
  display: inline-block;
  padding: 1px 1px;
  font-family: sans-serif;
  font-size: 15px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-right: 5px;
}
div.RadioButtons input[type="radio"]:focus + label {
  border: 2px  #444
}

button {
  border-radius: 4px;
  border: 1px solid black;
}

button:hover {
  background-color: darkgreen
}

button.InformationBox {
  background-color: #181818;
  border: 1px solid lightgray;
  font-size: 9px;

}
button.InformationBox:hover {
  background-color: #20C20E;
}

BaseTimer {
  align-self: center;
}

body {
  min-height: 300px;
  min-width: 200px;
  background-color: #181818;
  /*color: var(--color-text);
  background: var(--color-background); */
  transition: color 5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p.HelpText {
  font-size: 9px;
  color: lightgrey;
}
p.ErrorText {
  font-size: 9px;
  color: red;
}

li.PlayerList {
  text-align: left;
  font-style: italic;
  font-size: 10px;
}
li.LeaderBoard {
  text-align: left;
  font-style: italic;
  font-size: x-small;
  margin-left: none;
}
li.CategoryList {
  font-size: 10px;
  list-style: none;
  font-style: italic;
}

h2 {
  font-family: 'digitalFont';
  font-size: 40px;
  color: #20C20E;
  margin-top: 0px;
  margin-bottom: 0px;
}

h2.GameOver {
  font-size: 30px;
}


img.main-logo {
  width: 200px;
  height: 150px;
}

button {
  background-color: #20C20E;
  color: white;
  text-align: center;
  margin-left: 5px;
  padding-right: 5px;
  
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.5rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
