<!----------
- The App.vue file is the component that is first mounted upon opening the program. This is the root component of the application.
- Parents: None
- Children: IntroPage.vue, SetUsername.vue, HomepPageView.vue
- The main responsibility of this class is to serve as the foundation for the other classes, instantiating different required variables and mounting the core components. 
- 
------------->

<script setup>
  // Import statements for the relevant child-components of App.vue
import IntroPage from '@/components/IntroPage.vue';
import SetUsername from '@/components/SetUsername.vue';
import HomePageView from '@/components/HomePageView.vue'
</script>

<!---- Template code simply renders the three child components -->
<template>
<div id="app" :key="componentVersion">
  <div v-if="IntroPageView" id="Intro-Page" ref="Intro-Page">
      <IntroPage @userLogin="googleLogin($event)"></IntroPage>
  </div>

  <div v-if="UsernamePage" id="SetUsername">
    <SetUsername @setUsername="setUsername" @usernameToIntro="usernameToIntro"></SetUsername>
  </div>

  <div v-if="HomePage" id = "Home-Page">
      <HomePageView @Homepage="Homepage" @changeUsername="changeUsername($event)" @ClearMultiVariable="ClearMultiVariable" @logout="logout" @resetSoloStatus="resetSoloStatus" :gamesPlayed="gamesPlayed" :gamesWon="gamesWon" :UsersID="UsersID" :userProfile="userProfile" :UserGoogleID="UserGoogleID" :userSoloContinue="userSoloContinue" :userMultiContinue="userMultiContinue" :multiGameDetails="multiGameDetails"></HomePageView>
  </div>
</div>
</template>

<script>
export default {
  // Sockets set up to react to events emitted from the server. 
    sockets: {
      connect() {
        console.log('Client has successfully connected to the Socket.IO websocket.');
      },
      disconnect() {
        console.log('Client has disconnected from the Socket.IO websocket.');
      },
      // Fired whenever the user logs in for the first time  
      UserNotFound(){
          this.UsernamePage = true;
          this.IntroPageView = false;
      },
      // Fires when the server sends an event with the user's gamesPlayed and gamesWon statistics.
      sendUserDetails(MessageDetails){
            this.gamesPlayed = MessageDetails[0].gamesPlayed;
            this.gamesWon = MessageDetails[0].wonGames
      },
      // Fires whenever a user logging in has been encountered previously
      UserFound(users){
          console.log(users);
          this.UsernamePage = false;
          this.HomePage = true;
          this.IntroPageView = false;
          this.getUserDetails(users[0].googleID);
          console.log(users);
          this.UsersID = users[0].username;
          this.UserGoogleID = users[0].googleID;
          this.userProfile = new User(this.UsersID);
          this.userProfile.googleID = this.UserGoogleID;
      },
      Homepage(){
        this.HomePage = true;
      },
      // Logic for setting a new username
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
      // Events fired whenever a user is rejoining a game. 
      UserInMultiplayer(MessageDetails){
        console.log(MessageDetails);
        this.userInAMultiGame = true;
        this.multiGameDetails.playersLobby = MessageDetails[0]
        this.multiGameDetails.LobbyUsers = MessageDetails[1];

        this.IntroPageView = false;
        this.HomePage = true;
        this.userMultiContinue = true;
      },
      UserInSinglePlayer(MessageDetails){
        console.log('test gurl');
        if(this.UserGoogleID === MessageDetails){
            console.log('test boiii');
            this.IntroPageView = false;
            this.HomePage = true;
            this.userSoloContinue = true;
        }
      },
      
    },
  data(){
    return {
      IntroPageView: true,
      HomePage: false,
      UsernamePage: false,

      UsersID: '1234',
      UserGoogleID: '',
      userProfile: undefined,

      gamesPlayed: 0,
      gamesWon: 0,

      userSignedIn: false,
      userSoloContinue: false,
      userMultiContinue: false,
      multiGameDetails: {},
      }
    },
    components: {
      IntroPage,
      SetUsername,
      HomePageView
    },
    methods: {
      // Fires an event to get the users gamesWon and gamesPlayed statistics
      getUserDetails(userGoogleID){
        this.$socket.emit('retrieveDetails', userGoogleID)
        this.gameStarted = false;
      }, 
      // Logic allows us to change usernames
      changeUsername(newUsername){
          console.log(newUsername);
          this.UsersID = newUsername
          this.userProfile.userID = this.UsersID;
          console.log(this.UserGoogleID)
          this.$socket.emit('newUsername', this.UserGoogleID, this.UsersID)
      },
      // Logic allows us to login
     googleLogin(googleID){
        var vm = this;
        this.userSignedIn = true;
        vm.IntroPageView = false;
        vm.UserGoogleID = googleID;
     },
     setUsername(UsersID){
        if(UsersID === ''){
          alert("Please enter a name")
        }else{
          this.$socket.emit('nameTaken', UsersID)
        }
        },
        // View controllers
     usernameToIntro(){
      this.UsernamePage = false;
      this.IntroPageView = true;
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
    // Logout functionality
    logout(){
      this.HomePage = false;
      this.IntroPageView = true;
    },
    // Resets the flags that are used to rejoin games
    resetSoloStatus(){
      this.userSoloContinue = false;
    },
    ClearMultiVariable(){
      this.userMultiContinue = false;
      console.log("Cleaned");
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
/* The below font styling is adapted from the styling from Cormac Muir's project */
/* C. Muir, ‘A Distributed Game Using Ad Trackers In Web Browsers’, Dissertation, University Of Glasgow, Glasgow, 2022. */
@font-face {
    font-family: 'digitalFont';
    src: url('./fonts/digital-7.ttf');
}

li{
  color: white;

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

/* Style below adapted from this tutorial: M Heath, "Customize Radio Button with CSS", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */
div.RadioButtons{
  width: 200px;
  height: 30px;
}

div.RadioButtons input[type="radio"] {
  opacity: 0.011;
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
