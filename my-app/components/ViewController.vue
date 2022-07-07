<script setup>

</script>

<template>
   <div id="app">
    <div style="width:240px;" v-if="IntroPage" id="Intro-Page" stle="width: 450px" ref="Intro-Page">
    <div id="Heading">
      <h2>TrackHunt</h2>
      <img src="Static/Logo.png" alt="TrackHunt Logo"/>
      <h6>Who is watching you?</h6>
      <p>{{ count }}</p> 
    </div>
    <div id = "LoginSection">
      <button @click="introToLogin">Login</button>
      <p id="SignUp">New to TrackHunt? Sign up <a>Here</a></p>
    </div>
  </div>

  <div v-if="LoginPage" id = "Login-Page">
    <h2>TrackHunt</h2>
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/>  
    <label>Username:</label>
    <input type="text"><br/>
    <label>Password:</label>
    <input type="password">
    <br/>
    <button @click="loginToIntro" type="button">Cancel</button>
    <button @click="login" type="button">Login</button>
  </div>

  <div v-if="PasswordPage" id = "Password-Reset">
    <h2>TrackHunt</h2>
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/>  
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
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/>
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
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/>
    <p class="HelpText">Welcome back!</p>
    <button @click="solomode" type="button">Play Solo</button><br/>
    <button @click="leaderboards" type="button">Leader Boards</button>
    <button @click="joinlobby" type="button">Join Lobby</button><br/>
    <button @click="options" type="button">Options</button>
    <button @click="createLobby" type="button">Create Lobby</button>
  </div>

  <div v-if="LeaderBoard"  id = "Leader-Board">
    <h2>TrackHunt</h2><br/>
    <p class="HelpText">Leader Boards</p>
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
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/><button type="button">Light Mode</button><br/>
    <button type="button">Dark Mode</button><br/>
    <button type="button">Language</button><br/>
    <br/><br/>
    <button @click="exitToHomePage" type="button">Home Page</button><br/>
  </div>

  <div v-if="JoinLobbyPage" id="Join-Lobby">
    <h2>TrackHunt</h2>
    <img src="Static/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter lobby ID:</label><br/>
    <input type="text">
    <br/>
    <button type="button">Join</button>
    <button @click="exitToHomePage" type="button">Back</button>
  </div>

  <div v-if="CreateLobbyPage" id="Create-Lobby">
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: 1234567</p>
    <!----Animation of the wheel turning ----->

    <p class="HelpText">Connected Players:</p>
    <ul>
      <li id="Player1">1. </li>
      <li id="Player2">2. </li>
      <li id="Player3">3. </li>
      <li id="Player4">4. </li>
    </ul>
    <button class="Radio" type="button">Classic</button>
    <button class="Radio" type="button">Bingo</button>
    <button class="Radio" type="button">Roulette</button>
    <br/>
    <button type="button">Begin Game</button>
    <button @click="exitToHomePage" type="button">Cancel</button>
  </div>

  <div v-if="SoloPage" id="Solo-Mode">
    <h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode</p>
    <br/>
    <p id="LeaderBoard">Previous Scores:</p>
    <ul>
      <li id="Score1">1. </li>
      <li id="Score2">2. </li>
      <li id="Score3">3. </li>
      <li id="Score4">4. </li>
      <li id="Score5">5. </li>
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
      CreatelobbyPage: false,
      SoloPage: false,

      pages: [

      ]
    };
  },
  methods: {
    introToLogin(){
      this.LoginPage = true;
      this.IntroPage = false;
      console.log("This is a test");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    },
    loginToIntro(){
      this.LoginPage = false;
      this.IntroPage = true;
    },
    login(){
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
      this.CreateLobbyPage = true;
      this.HomePage = false;
    },
    exitToHomePage(){
      this.CreateLobbyPage = false;
      this.JoinLobbyPage = false;
      this.LeaderBoard = false;
      this.SoloPage = false;
      this.OptionsPage = false;
      this.HomePage = true;
    }
  }
}
</script>

<style>
@import './src/assets/base.css';
* {
    background-color: CCC;
    margin: auto;
    padding: 10px;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

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
