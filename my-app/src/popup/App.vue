<script setup>
import { ref } from 'vue';
//import BaseTimer from "../components/BaseTimer"
</script>

<template>
<div id="app" :key="componentVersion">
  <div v-if="IntroPage" id="Intro-Page" stle="width: 450px" ref="Intro-Page">
      <Transition>
      <h2 v-if="IntroPage">TrackHunt</h2>
      </Transition>
      <Transition><img v-if="IntroPage" class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/></Transition>
      <h5>Who is watching you?</h5>
      <Transition><button v-if="IntroPage" @click="googleLogin" ref="LoginButton">Login</button></Transition>
      <!------<Transition><button v-if="IntroPage" @click="NoAccount">No-Login Mode</button></Transition> --->
      <Transition><p v-if="IntroPage" class="HelpText">To use TrackHunt, sign in with Google and ensure you are signed in on your browser.</p></Transition>
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
    <button @click="passiveMode" type="button">View Passive Mode Stats</button>
  </div>

  <div v-if="LeaderBoard"  id = "Leader-Board">
    <h2>TrackHunt</h2><br/>
    <p class="HelpText">LeaderBoards</p>
    <button class="Radio" type="button">Personal</button>
    <button class="Radio" type="button">World</button><br/>
    <li v-for="item in multiClassicLeaderboard" :key="item">
        {{ item.username }} - {{ item.score }} - {{ item.createdAt }}
    </li>

    <div id="Leaderboard">
    </div>
    <button class="Radio" type="button">Classic</button>
    <button class="Radio" type="button">Bingo</button>
    <!---<button class="Radio" type="button">Roulette</button>---->
    <br/>
    <button @click="exitToHomePage" type="button">HomePage</button>
  </div>

  <div v-if="OptionsPage"  id="Options-Page">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/><button type="button">Light Mode</button><br/>
    <button type="button">Dark Mode</button><br/>
    <button type="button">Language</button><br/>
    <button @click="changeUsernamePage" type="button">Change Username</button>
    <br/><br/>
    <button @click="exitToHomePage" type="button">Home Page</button><br/>
  </div>

  <div v-if="UsernameChangePage" id="UsernameChangePage">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <p>Your current username is: {{ UsersID }}</p>
    <label>Enter a new username:</label><br/>
    <input ref="NewUsername" type="text">
    <br/>
    <button @click="changeUsername" type="button">Save</button>
    <button @click="exitToHomePage" type="button">Back</button>
  </div>

  <div v-if="JoinLobbyPage" id="Join-Lobby">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter lobby ID:</label><br/>
    <input ref="LobbyID" type="text">
    <p class="ErrorText">{{ lobbyError }}</p>
    <button @click="enterLobby" type="button">Join</button>
    <button @click="exitToHomePage" type="button">Back</button>
  </div>
    
  <div v-if="UsernamePage" id="UsernamePage">
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter a username for your account:</label><br/>
    <input ref="nickname" type="text">
    <br/>
    <button @click="noLoginMode" type="button">Join</button>
    <button @click="noLoginToIntro" type="button">Back</button>
  </div>

  <div v-if="LobbyPage" id="Lobby">
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->
    <input v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label v-if="isLobbyCreator">Classic</label>
    <input v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label v-if="isLobbyCreator">Bingo</label>

    <p class="HelpText">Connected Players:</p>
    <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :key="item">
        {{ ++count }}. {{ item.userID }}
    </li>
    <br/><br/>

    <!------<button class="Radio" type="button">Roulette</button>--->
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <input v-if="isLobbyCreator" class="Radio" type="radio" value="10" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label v-if="isLobbyCreator">2 min</label>
    <input v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label v-if="isLobbyCreator">5 min</label>
    <input v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label v-if="isLobbyCreator">10 min</label>
    <button v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
    <button @click="multiGameInitiated" type="button">Begin Game</button>
    <!------<button @click="exitToHomePage" type="button">Cancel</button>---->
    <button @click="leaveGame" type="button">Leave Game</button>
  </div>

  <div v-if="PassivePage">
  <h2>TrackHunt</h2>
  <p class="HelpText">"Passive Mode" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.</p>
  <p class="PassiveText">Since you installed TackerHunt, you have been tracked: {{ passiveModeTotalTrackers }} times.</p>
  <p class="PassiveText">This was done by a total of {{ passiveModeUniqueHosts }} different entities.</p>
  <p class="PassiveText">These entities hailed from {{ passiveModeTotalCounties }} countries.</p>
  <p class="PassiveText">To see a complete list of hosts and counts, click <button @click="PassiveToHost">here</button></p>
  <p class="PassiveText">To see a complete list of countries and counts, click <button @click="PassiveToCountry">here</button></p>
  <button @click="exitToHomePage">Back</button>
  
  </div>

  <div v-if="HostPage">
  <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Hosts</p>
  <li v-for="item in passiveModeHosts" :key="item" class="TrackedCountry">
      {{ item.URL }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="HostToPassive">Back</button>
  </div>

  <div v-if="CountryPage">
  <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Countries</p>
  <li v-for="item in passiveModeCountries" :key="item" class="TrackedCountry">
      {{ item.name }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="CountToPassive">Back</button>
  </div>

  <div v-if="SoloPage" id="Solo-Mode">
    <h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode</p>
    <input class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label>Classic</label>
    <input class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label>Bingo</label>


    <p id="LeaderBoard">Previous Scores:</p>
    <ul>
      <li class="PlayerList" id="Score1">1. </li>
      <li class="PlayerList" id="Score2">2. </li>
      <li class="PlayerList" id="Score3">3. </li>
      <li class="PlayerList" id="Score4">4. </li>
      <li class="PlayerList" id="Score5">5. </li>
    </ul>



    <br/>
    <input class="Radio" type="radio" value="10" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label>2 min</label>
    <input class="Radio" type="radio" value="300" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label>5 min</label>
    <input class="Radio" type="radio" value="600" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label>10 min</label>
    <br/>
    <button @click="soloGameInitiated" type="button">Begin Game</button>
    <button @click="exitToHomePage" type="button">Cancel</button>
  </div>

  <div v-if="SoloGame" id="Solo-Game" :key="componentVersion">
    <h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode - {{ GameMode }}</p>
    <div v-if="(!gameOver)">
    <br/>

    <label>Time remaining: </label>
    <p class="timer" ref="timer" id="timer" :class="{timer:timerClose}"> {{ timer }}</p>

    <!-----Using a more sophisticated solution for the timer. Adapted from https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f-->
    <!-----<BaseTimer :time-left="timeLeft"></BaseTimer>-->
    <!------<div class="TimerSection">---->
    <!-----<BaseTimer :timeToGo="timeLeft"/>-->


    <!------</div>--->



    <div v-if="GameMode === 'Classic'">
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        {{ item.name }} - {{ item.count }}
    </li>
    <br/>
    <label>Current Score: </label><p> {{ this.userScore }}</p>
    </div>
    <div v-if="GameMode === 'Bingo'">
    <label>Countries To Locate:</label>
    <ol>
    <li v-for="item in countriesToFind" ref="CountriesToFind" :class="{found:item.found}" :key="item">
        {{ item.country }}
    </li>  
    </ol>
    <label>Countries Located</label>
    <ol>
      <li v-for="item in VisitedCountries" ref="ListOfCountries" class="BingoList" :key="item">
          {{ item.name }}
      </li>
    </ol>
    </div>

    <button @click="gameSetup" type="button">Start</button>
    <button @click="endGame" type="button">End Game</button>
    </div>
    <div v-if="gameOver">
    <h2>GAME OVER</h2>
    <p>Your score was: {{ userScore }}</p>
    <p>You were tracked by {{ noOfCountries }} nation(s)</p>
    <button @click="exitToHomePageReset" type="button">HomePage</button>
    </div>
    <!--- --<button @click="gameSetup" type="button">Refresh</button> --->
  </div>

  <div v-if="MultiPlayer" id="Multiplayer-Game" :key="componentVersion">
    <h2>TrackHunt</h2>
    <!------<p class="HelpText">Solo Mode</p>--->
    <div v-if="(!gameOver)">
    <br/>
    <label>Time remaining: </label>
    <p> {{ timer }}</p>
    
    <div v-if="GameMode === 'Classic'">
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item" class="TrackedCountry">
        {{ item.name }} - {{ item.count }}
    </li>
    <br/>
    <label>Current Score: </label><p> {{ this.userScore }}</p>
    </div>
    <div v-if="GameMode === 'Bingo'">
    <label>Countries To Locate:</label>
    <ol>
    <li v-for="item in countriesToFind" ref="CountriesToFind" :class="{found:item.found}" :key="item">
        {{ item.country }}
    </li>  
    </ol>
    <label>Countries Located</label>
    <ol>
      <li v-for="item in VisitedCountries" ref="ListOfCountries" class="BingoList" :key="item">
          {{ item.name }}
      </li>
    </ol>
    </div>
    <ol v-if="!(allPlayersReady)">
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="LobbyUsers" :key="item">
        {{ item.userID }} - {{ item.ready }}
    </li>
    </ol>
    <ol v-if="allPlayersReady && !(gameStarted)">
        <li class="LobbyUsers">All players are ready</li>
    </ol>
    <ol v-if="allPlayersReady && (gameStarted)">
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="LobbyUsers" :key="item">
        {{ item.userID }} - {{ item.score }}
    </li>
    <p class="ErrorText"> {{ playerLeaveMessage }}</p>
    </ol>
    <button v-if="isLobbyCreator" @click="gameSetup" type="button">Start</button>
    <button @click="playerReady">Ready Up</button>
    <button @click="leaveGame" type="button">Leave Game</button>
    </div>

    <div v-if="gameOver">
    <h2>GAME OVER</h2>
    <div v-if="didYouWin">
    <p>You won! Congratulations</p>
    <img v-if="IntroPage" class="trophy" src="staticimages/trophy.png" alt="A picture of a trophy"/>
    </div>
    <div v-if="!(didYouWin)">
    <p>Condolenses. The winner of the game was {{ WinningUser }}</p>
    </div>

    <div v-if="GameMode === 'Classic'">
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="LobbyUsers" :key="item.name">
        {{ item.userID }} - {{ item.score }}
    </li>
    <p>Your score was: {{ userScore }}</p>
    <p>You were tracked by {{ noOfCountries }} nation(s) in total</p>
    </div>

    <div v-if="GameMode === 'Bingo'">
    <p>You managed to get tracked by {{ noOfCountriesBingo }} of the bingo countries</p>
    <p>You were tracked by {{ noOfCountries }} nation(s) in total</p>
    </div>


    <button @click="exitToHomePageReset" type="button">HomePage</button>
    </div>
    <!--- --<button @click="gameSetup" type="button">Refresh</button> --->
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

          for(var i = 0; i < this.countriesToFind.length; i++){
            if(this.countriesToFind[i].found === true){
              this.noOfCountriesBingo++
            }
          }

          console.log(this.playersLobby === lobby);

          if((this.playersLobby === lobby) && (this.UsersID != lobbyAndUser[1])){
            this.winningUser = lobbyAndUser[1];
            this.gameOver = true;
            this.reset();
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

          this.UsersID = users[0].username;
          this.UserGoogleID = users[0].googleID;
          this.userProfile = new User(this.UsersID);

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
        this.LobbyPage = true;
        //this.$socket.join(lobbyID)
        this.lobbyError = false;
        this.allPlayersReady = false;
      },
      lobbyFailure() {
        console.log("there was an error when attempting to connect to the server")
        this.lobbyError = 'Error: Lobby Not Found';
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
          }
          this.gameOver = false;

      },
      player_leave_message(messageDetails){
          this.playerLeaveMessage = "User: " + messageDetails + " has disconnected from the lobby."
          if(this.UsersInLobby.length === 1){
            this.playerLeaveMessage += "You are the only player in this multiplayer game."
          }
          console.log(this.playerLeaveMessage)
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
              this.UsersInLobby[i].ready = true;
            }
            if(this.UsersInLobby[i].ready != true){
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
      sendLeaderBoards(MessageDetails){
        this.multiClassicLeaderboard = MessageDetails[0];
        this.multiBingoLeaderboard = MessageDetails[1];
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
      UsernamePage: false,
      playersLobby: '',
      UsersID: '1234',
      UsersInLobby: [],
      noOfUsersInLobby: 0,
      componentVersion: 0,
      UserGoogleID: '',
      SoloGame: false,
      VisitedCountries: [],
      componentKey: 0,
      userScore: 0,
      gameStarted: false,
      gameOver: false,
      noOfCountries: 0,
      userProfile: undefined,
      allUserIDs: [],
      allUsers: [],
      MultiPlayer: false,
      WinningUser: undefined,
      didYouWin: false,
      lobbyError: '',
      isLobbyCreator: false,
      allPlayersReady: false,
      UsernameChangePage: false,
      PassivePage: false,
      HostPage: false,
      CountryPage: false,
      GameMode: 'Classic',


      userLeaveMessage: "",

      passiveModeHosts: [],
      passiveModeCountries: [],
      passiveModeTotalTrackers: 0,
      passiveModeTotalCounties: 0,
      passiveModeUniqueHosts: 0,





      easyCountries: ["United States", "United Kingdom"],
      medEasyCountries: ["Canada"],
      hardCountries: ["Russia"],
      countriesToFind: [],
      noOfCountriesBingo: 0,

      soloClassicLeaderboard: [],
      soloBingoLeaderboard: [],
      multiClassicLeaderboard: [],
      multiBingoLeaderboard: [],

      timer: 10,
      timePassed: 0,
      timerClose: false,

      userSignedIn: false,
      }
    },
    computed: {
      // https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f
      formatTimeLeft(){
        var timeTG = this.timer;

        var minutes = Math.floor(timeTG/60);
        var seconds = timeTG % 60;

        if(seconds < 10){
          seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;

      },
      timeLeft(){
        return this.timer - this.timePassed;
      }//,
      //orderedCountries: function(){
        //return _.orderBy(this.BingoCountries, 'count')
      //}
    },
    props: {
      timeToGo: {
        type: Number,
        required: true
      }
    },
    components: {
      //BaseTimer
    },
    
    
    // Adapted from https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js
    watch: {
      timer: {
        handler(value) {
          if(value > 0 && this.gameStarted){
            setTimeout(() => {
              this.timer--;
            }, 1000);
          }else if(value <= 10 && value > 1){
              this.timerClose = true;
          }else if(value === 0){
            this.endGame()
          }
        },
        immediate: true
      }
    },
    methods: {
      testMethod(){
        this.timerClose = true;
        //console.log(BaseTimer)
      },
      getHighScores(multiplayer, gamemode){
        this.$socket.emit('retrieveLeaderBoards', multiplayer, gamemode);
      },
      
      initiateGame(){
        var vm = this;
        this.gameStarted = true;
        if(this.timer <= 0){
          this.timer = 120;
        }

        this.timer = this.timer * 1;
        this.timer -= 1;
        chrome.runtime.sendMessage({ message: 'reset'}, function(response) {
          if(response === 'success'){
            console.log('successfully started the game.')
            vm.VisitedCountries = [];
            vm.userScore = 0;
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
            vm.updateListOfCountries()
            vm.VisitedCountries = result.countryList.newValue;
            vm.gameStarted = true;
            //console.log(vm.GameMode)
            if(vm.GameMode === "Classic"){
              vm.updateScoreClassic()
            }else if(vm.GameMode === "Bingo"){
              vm.updateScoreBingo()
            }
        }) 

          /* chrome.windows.create({
            url: 'https://www.google.com',
          }) */
      },generateRandomIntHelper(max){
          return Math.floor(Math.random() * max)

          //Nabbed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      },
      
      onGameModeChange(event){
        var gameModeSelected = event.target.value;
        this.GameMode = gameModeSelected;
      },
      

      onTimeChange(event){ // https://www.codecheef.org/article/how-to-get-selected-radio-button-value-in-vuejs
        var timeSelected = event.target.value;
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

      changeUsername(){
          this.UsersID = this.$refs.NewUsername.value;
          this.userProfile.userID = this.UsersID;
          this.exitToHomePage();
          console.log(this.UserGoogleID)

          this.$socket.emit('newUsername', this.UserGoogleID, this.UsersID)
      },
      leaveGame(){
        console.log(this.UsersInLobby)
        for(var i = 0; i < this.UsersInLobby.length; i++){
          if(this.UsersInLobby[i].userID === this.UsersID){
            /*for(var j = i; j < this.UsersInLobby.length-1; j++){
              this.UsersInLobby[j] = this.UsersInLobby[j+1];
            }
            this.UsersInLobby[this.UsersInLobby.length] = undefined;*/
            this.UsersInLobby.splice(i, i+1)
            console.log("Player deleted")
            console.log(this.UsersInLobby)
          }
        }

        this.$socket.emit('playerLeft', this.UsersInLobby, this.playersLobby, this.UsersID)
        console.log('we reached here');
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
        } 
        this.WinningUser = winningUser;

        this.gameOver = true;

        if(this.GameMode === "Classic"){
          this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, this.userScore, (this.MultiPlayer === true))
        }

        if(this.WinningUser === this.UsersID){
          this.didYouWin = true;

          // This is here to make sure this is only fired once per game, by the winner
          this.$socket.emit('gameWon', this.UserGoogleID)
        }

        //Close the Lobby
        this.$socket.emit('closeLobby', this.playersLobby)

        this.reset();

      },
      endBingoGame(){

        this.didYouWin = true;
        if(this.MultiPlayer){
          this.$socket.emit('endBingoGame', this.playersLobby, this.UserGoogleID)
          this.$socket.emit('gameWon', this.UserGoogleID);
          this.$socket.emit('closeLobby', this.playersLobby)
        }
        this.noOfCountriesBingo = this.countriesToFind.length;
        this.WinningUser = this.UsersID
        this.didYouWin = true;


        this.gameOver = true;
        this.reset();
      },
      playerReady(){
          this.userProfile.ready = true;
          for(var i = 0; i< this.noOfUsersInLobby; i++){
            if(this.UsersInLobby[i].userID === this.userProfile.userID){
              this.UsersInLobby[i].ready = true;
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

     updateListOfCountries(){
        var vm = this;
        
        chrome.storage.local.get(["countryList"], function(result){
          vm.VisitedCountries = result.countryList;
        })
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

        this.HomePage = false;
        this.PassivePage = true;

        console.log(this.passiveModeCountries);
        console.log(this.passiveModeHosts)

     }, 

     updateScoreClassic(){
        var vm = this;

        chrome.storage.local.get(["countryList"], function(result){
            let count = ref(0);
            let score = 0;
            for(var i = 0; i < result.countryList.length; i++){
                count.value += result.countryList[i].count;
                if(result.countryList[i].name === "United States"){
                    score += result.countryList[i].count;
                }else if(result.countryList[i].name === "United Kingdom" || result.countryList[i].name === "Canada"){
                    score += (result.countryList[i].count)*2;
                    console.log(score + "Test passed");
                }else if(result.countryList[i].name === "Germany" || result.countryList[i].name === "Netherlands" || result.countryList[i].name === "Ireland"){
                    score += (result.countryList[i].count)*3
                }else if(result.countryList[i].name === "Russia"){
                    score += (result.countryList[i].count)*4
                }else{
                    score += (result.countryList[i].count)*5
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
        console.log(this.countriesToFind)

        for(var j = 0; j < this.countriesToFind.length; j++){
            if(this.countriesToFind[j].found != true){
              allFound = false;
            }else if(!(this.countriesToFind[j] in this.userProfile.BingoCountries) && this.countriesToFind[j].found === true){
              this.userProfile.BingoCountries.push(this.countriesToFind[j])
            }
            console.log(this.countriesToFind[j].found)
        }

        console.log(allFound);

        if(this.MultiPlayer){
          this.$socket.emit('bingoScoreUpdate', this.userProfile, this.lobbyID)
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
        }else if(this.MultiPlayer === false){
          this.initiateGame();
        }
     },
     
     googleLogin(){
         var vm = this;
         chrome.runtime.sendMessage({ message: 'login'}, function(response) {
            if (response === 'success') {
              vm.userSignedIn = true;
              vm.IntroPage = false;
              chrome.runtime.sendMessage({ message: 'googleID'}, function(response){
                   if((response === '') || (response === undefined)){
                    console.log("No google ID found");
                   }else{
                      var googleID = response;
                      console.log(googleID);
                      googleID = googleID.substring(0, 255);
                      vm.UserGoogleID = googleID;

                      console.log('test + ' + vm.UserGoogleID);
                      vm.$socket.emit('doesUserExist', googleID);
                    }
                })
              console.log(vm.UserGoogleID)
            }
         })
         
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
     noLoginMode(){
        this.UsersID = this.$refs.nickname.value;
        var userFound = false;
        this.userProfile = new User(this.UsersID);
        this.userProfile.userID = this.UsersID;
        //this.userProfile.googleID = this.UserGoogleID;
        //var vm = this;
        this.UsernamePage = false;
        this.HomePage = true;
        /*

        for(var i = 0; i < this.allUsers.length; i++){
          console.log(this.allUsers[i].googleID)
          if(this.allUsers[i].googleID === this.UserGoogleID){
            this.UserID = this.allUsers[i].googleID;
            this.userProfile = this.allUsers[i];
            this.UsernamePage = false;
            this.HomePage = true;
            userFound = true;
            console.log('this should fire for the second')
          }
        }
        */
        if(this.UsersID === '' && !(userFound)){
          alert("Please enter a name")
        }else if(this.UsersID in this.allUserIDs && !(userFound)){
          alert("Error, that name has been taken");
        }

        this.$socket.emit('newUser', this.UsersID, this.UserGoogleID);
        console.log("reached here");

        /*
        chrome.storage.local.get(["userQueryResult"], function(result){
          console.log(result);
          if(result === false){
              vm.userProfile = new User(vm.UsersID);
              vm.userProfile.googleID = vm.UserGoogleID;
              vm.UsernamePage = false;
              vm.HomePage = true;
              vm.allUserIDs.push(vm.UsersID);
              vm.allUsers.push(vm.userProfile);
              vm.$socket.emit('newUser', vm.userProfile.userID, vm.userProfile.googleID)
          }else if(result === true){
              chrome.storage.local.get(["usersFromQuery"], function(result){
                console.log(result)
              })
          }else{
            console.log("Error, query resulted in neither false nor true")
          }
        }) */


        /*
        if(this.UsersID === '' && !(userFound)){
          alert("Please enter a name")
        }else if(this.UsersID in this.allUserIDs && !(userFound)){
          alert("Error, that name has been taken");
        }else if(!(userFound)){
          console.log('This should fire for the first round')
          this.userProfile = new User(this.UsersID);
          this.userProfile.googleID = this.UserGoogleID;
          this.UsernamePage = false;
          this.HomePage = true;
          this.allUserIDs.push(this.UsersID);
          this.allUsers.push(this.userProfile);

          this.$socket.emit('newUser', this.userProfile.userID, this.userProfile.googleID)
          */
        },
     soloGameInitiated(){
        this.gameOver = false;
        this.SoloPage = false;
        this.SoloGame = true;

        //this.GameMode = 
        //this.timer = $('input[name=time]:checked').val();

        console.log(this.GameMode)
        console.log(this.timer);
     },
     multiGameInitiated(){
        this.countriesToFind = [];
        this.gameOver = false;
        this.LobbyPage = false;
        this.MultiPlayer = true; 

        if(this.isLobbyCreator){
           this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer)
           }
        

     },
     
     noLoginToIntro(){
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
     
     enterLobby(){
      if(this.$refs.LobbyID === null){
        return;
      }else{
          var lobbyID = this.$refs.LobbyID.value;
          this.playersLobby = lobbyID;
          this.$socket.emit('JoinLobby', lobbyID, this.userProfile);
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
      this.LeaderBoard = false;
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
    },
    exitToHomePageReset(){
      this.reset();
      this.exitToHomePage();
    },
    reset(){
      this.isLobbyCreator = false;
      this.userProfile.ready = false;
      this.UsersInLobby = [];
      this.userScore = 0;
      this.timer = 0;
      this.allPlayersReady = false;
      this.didYouWin = false;
      this.winningUser = false;
      this.VisitedCountries = [];
      this.noOfUsersInLobby = 0;
      this.gameStarted = false;
      this.userLeaveMessage = "";
      this.countriesToVisit = [];
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
    this.ready = false;
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
}
li.TrackedCountry{
  color: white;
  font-size: smaller;
  list-style: none;
  font-style: italic;
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
  width: 200px;
  height: 200px;
  text-align: center;
}

div.TimerSection {
  align-self: center;
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
  color: white;
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

h2 {
  font-family: 'digitalFont';
  font-size: 40px;
  color: #20C20E;
  margin-top: 0px;
  margin-bottom: 0px;
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
