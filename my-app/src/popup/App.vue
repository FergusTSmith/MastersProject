<script setup>
import { ref } from 'vue';
import IntroPage from '@/components/IntroPage.vue';
import SetUsername from '@/components/SetUsername.vue';
import HomePageView from '@/components/HomePageView.vue'
</script>

<template>
<div id="app" :key="componentVersion">
  <div v-if="IntroPage" id="Intro-Page" ref="Intro-Page">
      <IntroPage @userLogin="googleLogin($event)"></IntroPage>
  </div>

  <div v-if="UsernamePage" id="SetUsername">
    <SetUsername @setUsername="setUsername" @usernameToIntro="usernameToIntro"></SetUsername>
  </div>

  <div v-if="HomePage" id = "Home-Page">
      <HomePageView :UsersID="UsersID" :userProfile="userProfile"></HomePageView>
  </div>
</div>
</template>

<script>
export default {
  // https://manage.auth0.com/dashboard/eu/dev-li-9809u/applications/s449g7DqINXUA9dZNRPdVTwPswnMX9qJ/quickstart
    sockets: {
      connect() {
        console.log('Client has successfully connected to the Socket.IO websocket.');
      },
      disconnect() {
        console.log('Client has disconnected from the Socket.IO websocket.');
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
      UserInSinglePlayer(MessageDetails){
        var vm = this;
        if(this.UserGoogleID === MessageDetails){
            chrome.storage.local.get(['backupGameDetails'], function(result){
              var backupGame = result.backupGameDetails;
              vm.GameMode = backupGame.GameMode;
              vm.VisitedCountries = backupGame.VisitedCountries;
              vm.userScore = backupGame.score;
              vm.timer = backupGame.timer;
              vm.gameStarted = backupGame.gameStarted;

            })
        }

        this.IntroPage = false;
        this.SoloGame = true;
        this.HomePage = false;
        vm.gameStarted = true;
        vm.gameOver = false;

        this.initiateListener();
      },
      resendBingo(MessageDetails){
        if(this.playersLobby === MessageDetails[0]){
          if(this.UsersID != MessageDetails[1]){
            this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind)
          }
        }
      },
      sendGameDetails(MessageDetails){
        console.log(MessageDetails);
        console.log(this.playersLobby)
        if(this.playersLobby === MessageDetails[0] && this.UsersID != MessageDetails[1]){
          this.$socket.emit('sendingGameDetails', this.GameMode, this.timer, this.UsersInLobby, this.playersLobby, this.UsersID, this.allPlayersReady)
          console.log('should have sent the details by now!')
        }
        console.log(MessageDetails)
      },
      RejoinGame(MessageDetails){
        if(this.UsersID != MessageDetails[4]){
          this.GameMode = MessageDetails[0];
          this.timer = MessageDetails[1];
          this.UsersInLobby = MessageDetails[2];

          console.log(MessageDetails)
          var vm = this;

          if(this.GameMode === "Classic"){
            chrome.storage.local.get(["backupCountryList"], function(result){
              vm.VisitedCountries = result.backupCountryList;
              //console.log(vm.VisitedCountries);
            })
            for(var i = 0; i < vm.UsersInLobby; i++){
              console.log(vm.UsersInLobby)
              if(vm.UsersInLobby[i].userID === vm.UsersID){
                vm.userScore = vm.UsersInLobby[i].score
              }
            }
          }

          if(this.GameMode === "Bingo"){
            this.$socket.emit("BingoRejoin", this.playersLobby, this.UsersID)
          }

          this.VisitedCountries = vm.VisitedCountries;
          console.log(this.VisitedCountries)
          this.userScore = vm.userScore;

          this.allPlayersReady = true;

          for(var j = 0; j < this.UsersInLobby; j++){
            if(this.UsersInlobby[j].ready != true){
              this.allPlayersReady = false;
            }
          }

          this.initiateListener();

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
      gameStarted: false,
      gameOver: false,

      numberOfCookies: 0,

      categoryList: [],

      userLeaveMessage: "",


      gamesPlayed: 0,
      gamesWon: 0,


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

      APIEnabled: true,
      }
    },
    components: {
      IntroPage,
      SetUsername,
      HomePageView
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
      getUserDetails(userGoogleID){
        this.$socket.emit('retrieveDetails', userGoogleID)
        this.gameStarted = false;
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
        this.playersLobby = '';
        this.isLobbyCreator = false;
        this.exitToHomePageReset();
      },
      endGame(){
        var winningScore = 0;

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
              if(this.countriesToFind[j].found != true){
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

        if(!(this.MultiPlayer)){
          this.$socket.emit('soloGameFinished', this.UserGoogleID)
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

    
     googleLogin(googleID){
        var vm = this;
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
     
     usernameToIntro(){
      this.UsernamePage = false;
      this.IntroPage = true;
     },
     
     NoAccount(){
      this.IntroPage = false;
      this.NoLoginPage = true;
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


p{
  color: white;
}
p.TinyText{
  color: white;
  font-size: 7px;
  font-style: italic;
}

p.CountryText {
  color: white;
  font-size: 11.5px;
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
button.homepageButton {
   width: 45%;
  font-size: 11px;
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
  font-weight: bold;
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
