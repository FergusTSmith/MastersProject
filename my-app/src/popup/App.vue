<script setup>
import { classBody } from '@babel/types';
import { listenerCount } from 'process';
console.log(classBody);
console.log(listenerCount);
</script>

<template>
<div id="app">
    <div v-if="IntroPage" id="Intro-Page" stle="width: 450px" ref="Intro-Page">
      <Transition>
      <h2 v-if="IntroPage">TrackHunt</h2>
      </Transition>
      <Transition><img v-if="IntroPage" class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/></Transition>
      <h5>Who is watching you?</h5>
      <Transition><button v-if="IntroPage" @click="introToLogin">Login</button></Transition>
      <Transition><button v-if="IntroPage" @click="NoAccount">No-Login Mode</button></Transition>
      <Transition><p v-if="IntroPage" class="HelpText">New to TrackHunt? Sign up <a>Here</a></p></Transition>
    </div>

  <div v-if="LoginPage" id = "Login-Page">
    <Transition><h2 v-if="LoginPage" >TrackHunt</h2></Transition>
    <Transition><img v-if="LoginPage" class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/></Transition><br/>  
    <Transition><label v-if="LoginPage">Username:</label></Transition>
    <Transition><input v-if="LoginPage" type="text"></Transition><br/>
    <Transition><label  v-if="LoginPage">Password:</label></Transition>
    <Transition><input  v-if="LoginPage" type="password"></Transition>
    <br/>
    <Transition><button v-if="LoginPage" @click="loginToIntro" type="button">Cancel</button></Transition>
    <Transition><button v-if="LoginPage" @click="loginPageChange" type="button">Login</button></Transition>
  </div>

  <div v-if="PasswordPage" id = "Password-Reset">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>  
    <h6>Password Reset Form</h6>
    <label>Email:</label>
    <input type="text"><br/>
    <label>Confirm Email:</label>
    <input type="text"><br/>
    <button type="button">Cancel</button>
    <button type="button">Reset Password</button>
    <p class="HelpText">Forgotten your details? Click <a href="www.google.com"> Here</a></p>
  </div>

  <div v-if="RegistrationPage" id = "Registration">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <h6>Sign Up Form</h6>
    <label>Username:</label>
    <input type="text"><br/>
    <label>Password:</label>
    <input type="password"><br/>
    <label>Confirm Password:</label>
    <input type="password"><br/>
    <button type="button">Cancel</button>
    <button type = "button">Sign Up</button>
  </div>

  <div v-if="HomePage" id = "Home-Page">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <p class="HelpText">Welcome back!</p>
    <button @click="solomode" type="button">Play Solo</button><br/>
    <button @click="leaderboards" type="button">LeaderBoards</button>
    <button @click="joinlobby" type="button">Join Lobby</button><br/>
    <button @click="options" type="button">Options</button>
    <button @click="createLobby" type="button">Create Lobby</button>
  </div>

  <div v-if="LeaderBoard"  id = "Leader-Board">
    <h2>TrackHunt</h2><br/>
    <p class="HelpText">LeaderBoards</p>
    <button class="Radio" type="button">Personal</button>
    <button class="Radio" type="button">World</button><br/>

    <div id="Leaderboard">
    </div>
    <button class="Radio" type="button">Classic</button>
    <button class="Radio" type="button">Bingo</button>
    <button class="Radio" type="button">Roulette</button>
    <br/>
    <button @click="exitToHomePage" type="button">HomePage</button>
  </div>

  <div v-if="OptionsPage"  id="Options-Page">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/><button type="button">Light Mode</button><br/>
    <button type="button">Dark Mode</button><br/>
    <button type="button">Language</button><br/>
    <br/><br/>
    <button @click="exitToHomePage" type="button">Home Page</button><br/>
  </div>

  <div v-if="JoinLobbyPage" id="Join-Lobby">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter lobby ID:</label><br/>
    <input ref="LobbyID" type="text">
    <br/>
    <button @click="enterLobby" type="button">Join</button>
    <button @click="exitToHomePage" type="button">Back</button>
  </div>
    
  <div v-if="NoLoginPage" id="NoLoginPage">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter a nickname for your session:</label><br/>
    <input ref="nickname" type="text">
    <br/>
    <button @click="noLoginMode" type="button">Join</button>
    <button @click="noLoginToIntro" type="button">Back</button>
  </div>

  <div v-if="LobbyPage" id="Lobby">
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->

    <p class="HelpText">Connected Players:</p>
    <ul>
      <li class="PlayerList" id="Player1">1. {{ UsersInLobby[0] }}</li>
      <li class="PlayerList" id="Player2">2. {{ UsersInLobby[1] }}</li>
      <li class="PlayerList" id="Player3">3. {{ UsersInLobby[2] }}</li>
      <li class="PlayerList" id="Player4">4. {{ UsersInLobby[3] }}</li>
    </ul>
    <button class="Radio" type="button">Classic</button>
    <button class="Radio" type="button">Bingo</button>
    <button class="Radio" type="button">Roulette</button>
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <button @click="closeLobby" type="button">Close Lobby</button>
    <button type="button">Begin Game</button>
    <button @click="exitToHomePage" type="button">Cancel</button>
  </div>

  <div v-if="SoloPage" id="Solo-Mode">
    <h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode</p>
    <br/>
    <p id="LeaderBoard">Previous Scores:</p>
    <ul>
      <li class="PlayerList" id="Score1">1. </li>
      <li class="PlayerList" id="Score2">2. </li>
      <li class="PlayerList" id="Score3">3. </li>
      <li class="PlayerList" id="Score4">4. </li>
      <li class="PlayerList" id="Score5">5. </li>
    </ul>
    <br/>
    <button class="Radio" type="button">Classic</button>
    <button class="Radio" type="button">Bingo</button>
    <br/>
    <button type="button">Begin Game</button>
    <button @click="exitToHomePage" type="button">Cancel</button>
  </div>
</div>
</template>

<script>

export default {
  // https://manage.auth0.com/dashboard/eu/dev-li-9809u/applications/s449g7DqINXUA9dZNRPdVTwPswnMX9qJ/quickstart
  
  sockets: {
    connect() {
      console.log('no worries, goose');
    },
    disconnect() {
      console.log("socket has been disconnected")
    },
    lobbySuccess(lobbyID) {
      console.log("successfully connected to lobby")
      this.playersLobby = lobbyID;
      this.UsersInLobby[this.noOfUsersInLobby++] = this.UsersID;
      this.JoinLobbyPage = false;
      this.LobbyPage = true;
    },
    lobbyFailure() {
      console.log("there was an error when attempting to connect to the server")
    },
    testMessage(){
      console.log("Test message was successful");
    },
    updateUsers(listOfUsers){
      this.UsersInLobby = listOfUsers;
    }

  },
  data(){
    return {
      message: "This is a test",
      LoginPage: false,
      IntroPage: true,
      count: 69,
      PasswordPage: false,
      RegistrationPage: false,
      HomePage: false,
      LeaderBoard: false,
      OptionsPage: false,
      JoinLobbyPage: false,
      LobbyPage: false,
      SoloPage: false,
      NoLoginPage: false,
      playersLobby: '',
      UsersID: '1234',
      UsersInLobby: [],
      noOfUsersInLobby: 0,



      pages: [

      ]
    };
  },
  methods: {
     noLoginMode(){
        this.UsersID = this.$refs.nickname.value;
        this.NoLoginPage = false;
        this.HomePage = true;
     },
     
     noLoginToIntro(){
      this.NoLoginPage = false;
      this.IntroPage = true;
     },
     
     NoAccount(){
      this.IntroPage = false;
      this.NoLoginPage = true;
     },
     
     closeLobby(){
        this.$socket.emit('closeLobby', this.playersLobby)
        this.LobbyPage = false;
        this.HomePage = true;
     },
     
     enterLobby(){
      //var lobbyID = document.getElementByID('JoinLobbyButton').innerHTML;
     // this.$emit(lobbyID);
     // console.log(lobbyID);
      //this.JoinLobbyPage = false;
      //this.CreateLobbyPage = true;
      if(this.$refs.LobbyID === null){
        return;
      }else{
          var lobbyID = this.$refs.LobbyID.value;
          this.$socket.emit('JoinLobby', lobbyID, this.UsersID);
      }

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
      this.HomePage = false;
      this.SoloPage = true;
    },
    leaderboards(){
      this.LeaderBoard = true;
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
      this.$socket.emit('CreateNewLobby', newLobbyID, this.UsersID);
      this.playersLobby = newLobbyID;
      
      this.LobbyPage = true;
      this.HomePage = false;
    },
    exitToHomePage(){
      this.LobbyPage = false;
      this.JoinLobbyPage = false;
      this.LeaderBoard = false;
      this.SoloPage = false;
      this.OptionsPage = false;
      this.HomePage = true;
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
}
p{
  color: white;
}
label {
  color: white;
}
h5{
  color: white;
}

div {
  width: 200px;
  height: 200px;
  text-align: center;
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
  font-size: 10px;
  color: white;
}

li.PlayerList {
  text-align: left;
  font-style: italic;
  font-size: 10px;
}

h2 {
  font-family: 'digitalFont';
  font-size: 40px;
  color: #20C20E;
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
