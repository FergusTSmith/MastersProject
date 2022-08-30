<!----------
- The MultiPlayerGame.vue file is the component responsible for rendering the gameplay page for multiplayer games.  
- Parents: LobbyView.vue
- Children: BaseTimer.vue, PassiveModeChart.vue
------------->
<template>
    <h2>TrackerHunt</h2>
    <p class="HelpText">MultiPlayer - {{ GameMode }} <button @click="displayInformation" class="InformationBox">i</button></p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Classic'">{{ ClassicInfo }}</p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Bingo'">{{ BingoInfo }}</p>
    <div v-if="(!gameOver)">
        <br/>
        <div class="timer">
            <BaseTimer :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
        </div>
        <br/>
        <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
            <p class="HelpText">Current Score: </p>
            <div class="CountryChart" v-if="VisitedCountries.length != 0">
                <p class="UserScore">{{ this.userScore }}</p>
                <PassiveModeChart ref ="CategoryChart" :chartData="countryChartData" :options="countryOptions" :height="20" :width="200"></PassiveModeChart>
            </div>
            <li v-for="item in orderedCountries" ref="ListOfScores" :key="item" class="TrackedCountry">
                <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="CountryText">{{ item.name }} | {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p><p class = "TinyText"> {{ item.site }} </p>
            </li>
            <br/>
            </div>
        <div v-if="GameMode === 'Bingo'">
            <label class="Guide">Countries To Locate:</label>
            <ol>
                <li class="CountriesToFind" v-for="item in countriesToFind" ref="CountriesToFind" :class="{found:item.found}" :key="item">
                    <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.country + '.jpeg'"/>{{ item.country }}
                </li>  
            </ol>
            <label class="Guide">Countries Located</label>
            <ol class="LocatedCountries">
                <li v-for="item in VisitedCountries" ref="ListOfCountries" class="BingoList" :key="item">
                    <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/>{{ item.name }}
                </li>
            </ol>
        </div>
        <ol class="BingoPlayers" v-if="!(allPlayersReady)">
            <li v-for="item in LobbyUsers" ref="ListOfScores" class="GameUsers" :key="item">
                {{ item.userID }} - {{ item.ready }}
            </li>
        </ol>
        <ol class="BingoPlayers" v-if="allPlayersReady && !(gameStarted)">
            <li class="GameUsers">All players are ready</li>
        </ol>
        <ol v-if="allPlayersReady && (gameStarted) && (GameMode === 'Bingo')">
            <li v-for="item in LobbyUsers" ref="BingoScores" class="BingoScores" :key="item">
                {{ item.userID }} | {{ item.BingoCountries.length }}
            </li>
        </ol>
        <div v-if="GameMode === 'Classic' && (gameStarted)">
            <li v-for="item in LobbyUsers" ref="ListOfScores" class="GameUsers" :key="item">
                {{ item.userID }} - {{ item.score }}
            </li>
        </div>
        <p class="CookieText">During this session, {{numberOfCookies.numberOfCookies}} tracking cookies have been set on your device.</p>
        <p class="ErrorText" v-if="playerLeaveMessage != 'false'"> {{ playerLeaveMessage }}</p>
        <div class="buttonBar">
            <button id="Start" v-if="isLobbyCreator && !(gameStarted)" @click="gameSetup" type="button">Start</button>
            <button id="Ready" v-if="!(allPlayersReady)" @click="playerReady">Ready Up</button>
            <button id="Leave" @click="leaveGame" type="button">Leave Game</button>
        </div>
    </div>
    <div v-if="gameOver">
        <h2 class="GameOver">GAME OVER</h2>
        <div v-if="didYouWin">
            <p>You won! Congratulations</p>
            <img class="trophy" src="staticimages/trophy-removebg-preview.png" alt="A picture of a trophy"/>
        </div>
        <div v-if="!(didYouWin) && WinningUser != undefined">
            <p>Condolences. The winner of the game was {{ WinningUser }}</p>
        </div>
        <div v-if="GameMode === 'Classic'">
            <p>Your score was: </p>
            <div class="CountryChart" v-if="VisitedCountries.length != 0">
                <p class="UserScore">{{ this.userScore }}</p>
                <PassiveModeChart ref ="CategoryChart" :chartData="countryChartData" :options="countryOptions" :height="20" :width="200"></PassiveModeChart>
            </div>
            <div class="GameResults">
                <li v-for="item in orderedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
                    <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="EndScreenText"> {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p>
                </li>
                <li v-for="item in LobbyUsers" ref="ListOfScores" class="GameUsers" :key="item">
                    {{ item.userID }} - {{ item.score }}
                </li>
            </div>
            <p>You were tracked by {{ noOfCountries }} nation(s) in total</p>
        </div>
        <div v-if="GameMode === 'Bingo'">
            <p v-if="WinningUser === undefined">Condlences, no players successfully found all the tracking nations!</p>
            <p>You managed to get tracked by {{ noOfCountriesBingo }} of the bingo countries</p>
            <p>You were tracked by {{ noOfCountries }} nation(s) in total</p>
        </div>
        <p v-if="categoryList.length != 0" class="CategoryText">During your game, you were tracked when visiting the following categories of pages: </p>
        <div class="CategoryChart" v-if="categoryList.length != 0">
            <PassiveModeChart ref ="CategoryChart" :chartData="chartData" :options="options" :height="20" :width="200"></PassiveModeChart>
            <li v-for="item in categoryList" ref="ListOfCategories" :key="item.name" class="CategoryList">
                {{ item.name }} | {{ item.count }}
            </li>
        </div>
        <button @click="exitToHomePageReset" type="button">HomePage</button>
    </div>
</template>
<script>
import BaseTimer from "../components/BaseTimer";
import PassiveModeChart from './PassiveModeChart.vue';
import _ from 'lodash';

export default {
    // This logic ensures that, on state change, the timer begins decreasing by 1 point per second. The watch function fires whenever the timer variable has a state change. 
    // Adapted from a StackOverflow answer: B Carey, "How do I create a sinmple 10 seconds countdown in Vue.JS", StackOverflow.com, Available at: https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js, Accessed 12/06/2022
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
            // End the game whenever we reach 0 seconds left.
            this.endGame()
            if(this.GameMode === 'Bingo'){
                this.endBingoGame();
            }
          }
        },
        immediate: true
      }
    },
    // Before any re-renders of this component, the below method will fire. This ensures that the chart data is updated so that the chart for countries and countries is responsive and shows the update whenever a country is located. 
    beforeUpdate(){
        for(var i = 0; i < this.categoryList.length; i++){
            this.categoryLabels[i] = this.categoryList[i].name;
            this.categoryCounts[i] = this.categoryList[i].count;
        }
        this.chartData.labels = this.categoryLabels;
        this.chartData.datasets[0].data = this.categoryCounts;
        for(var j = 0; j < this.VisitedCountries.length; j++){
            this.countryLabels[j] = this.VisitedCountries[j].name;
            this.countryCounts[j] = this.VisitedCountries[j].count;
        }
        this.countryChartData.labels = this.countryLabels;
        this.countryChartData.datasets[0].data = this.countryCounts;
    },
    // Whenever this component is initially rendered, we assign the UserInLobby and userProfile props to new variables so that they can be mutated. 
    mounted(){
        this.LobbyUsers = this.UsersInLobby;
        this.ProfileOfUser = this.userProfile
        // If we're continuing a rejoined game, get these game details from the other lobby users. 
        if(this.userMultiContinue){
            this.$socket.emit('getGameDetails', this.multiGameDetails.playersLobby, this.UsersID)
        }
        this.timer = this.startTime;
    },
    sockets: {
        // Event fires whenever a user indicates to the server that they are ready. 
        player_is_ready(lobbyDetails){
            var allReady = true;
            var user = lobbyDetails[0];
            var lobbyID = lobbyDetails[1];
            if(lobbyID === this.playersLobby){
            for(var i = 0; i < this.LobbyUsers.length; i++){
                if(this.LobbyUsers[i].userID === user.userID){
                    this.LobbyUsers[i].ready = "Ready";
                }
                if(this.LobbyUsers[i].ready != "Ready"){
                    allReady = false;
                    // If any users aren't ready, continue waiting. 
                }
             }
            }
            if(allReady){
                this.allPlayersReady = true;
            }
        },
        // Fired by the Lobby Creator whenever the game is to be began. Ensures the game is initiated synchronously between users.
        startGame(lobbyID){
            if(lobbyID === this.playersLobby){
                this.initiateGame();
            }
        },
        // This is fired whenever a user leaves, and is designed to display a message to other users informing them that this player is left. 
        player_leave_message(messageDetails){
          this.playerLeaveMessage = "User: " + messageDetails + " has disconnected from the lobby."
          if(this.UsersInLobby.length === 1){
            this.playerLeaveMessage += "You are the only player in this multiplayer game."
          }
          if(messageDetails === this.UsersID){
            this.SoloGame = false;
            this.HomePage = true;
            this.LobbyPage = false;
          }
        },
        // Generic method for updating the users whenever a state change occurs for any user. Ensures that all users see an accurate game state at all times. 
        updateUsers(lobbyDetails){
            var listOfUsers = lobbyDetails[0]
            var lobbyID = lobbyDetails[1]
            if(this.playersLobby === lobbyID){
                this.LobbyUsers = listOfUsers;
            }
        },
        // Logic for receiving the array of countries to visit within a bingo mode. Received from the server, which receives this from the lobby creator. 
        receiveCountriesToVisit(lobbyAndCountries){
            var lobby = lobbyAndCountries[0];      
            if(this.playersLobby === lobby && !(this.isLobbyCreator)){
                this.countriesToFind = lobbyAndCountries[1];
            }
        },
        // This event is fired whenever a player is rejoining and the server requests the game details from another lobby user. This sends the required information back to the server. 
        sendGameDetails(MessageDetails){
            if(this.playersLobby === MessageDetails[0] && this.UsersID != MessageDetails[1]){
                this.$socket.emit('sendingGameDetails', this.GameMode, this.timer, this.UsersInLobby, this.playersLobby, this.UsersID, this.allPlayersReady, this.countriesToFind)
                console.log('should have sent the details by now!')
            }
        },
        // This is the primary logic for rejoining a game. This renders the game page according to the state of the game, then re-initiates the listener. 
        RejoinGame(MessageDetails){
            if(this.UsersID != MessageDetails[3]){
                this.timer = MessageDetails[1];
                this.LobbyUsers = MessageDetails[2];
                this.countriesToFind = MessageDetails[6];
                this.allPlayersReady = MessageDetails[5]
                var vm = this;
                if(this.GameMode === "Classic"){
                    chrome.storage.local.get(["backupCountryList"], function(result){
                        vm.VisitedCountries = result.backupCountryList;
                    })
                    for(var i = 0; i < vm.UsersInLobby; i++){
                        if(vm.UsersInLobby[i].userID === vm.UsersID){
                            vm.userScore = vm.UsersInLobby[i].score
                        }
                    }
                }
                this.VisitedCountries = vm.VisitedCountries;
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
                this.$emit("ClearMultiVariable")
                }
        },
        // Method for resending Bingo countries to visit for a rejoining user.
        resendBingo(MessageDetails){
            if(this.playersLobby === MessageDetails[0]){
                if(this.UsersID != MessageDetails[1]){
                    this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind)
                }
            }
        },
        // Additional logic for ending a bingo mode game. Works out who is the winner and the status of the current user. I.e., finished or unfinished. 
        endBingoModeGame(lobbyAndUser){
            var lobby = lobbyAndUser[0];
            var counter = 0;
            for(var i = 0; i < this.countriesToFind.length; i++){
                if(this.countriesToFind[i].found === true){
                counter++
                }
            }
            this.noOfCountriesBingo = counter;
            if((this.playersLobby === lobby) && (this.UsersID != lobbyAndUser[1])){
                this.WinningUser = lobbyAndUser[1];
                this.gameOver = true;
                this.didYouWin = false;
            }
      },
    },
    components: {
        BaseTimer,
        PassiveModeChart
    },
    data(){
        return {
            // Variables for Information Boxes
            ClassicInfo: "In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)",
            BingoInfo: "In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game",
            InformationBox: false,

            // These variables concern gameplay
            gameOver: false,
            userScore: 0,
            VisitedCountries: [],
            numberOfCookies: 0,
            countriesToFind: [],
            finishedGame: false,
            APIEnabled: true,
            categoryList: [],
            gameStarted: false,
            achievements: [],
            timer: 110,
            noOfCountries: 0,
            WinningUser: undefined,
            didYouWin: false,
            noOfCountriesBingo: 0,

            // Variables Concern Lobby Logistics
            allPlayersReady: false,
            LobbyUsers: [],
            ProfileOfUser: undefined,

            // These are the variables from which Bingo Mode countries were chosen in development. The choice has been made to maintain these as the countries, as these are more realistic to find than 3 random countries from below. 
            easyCountries: ["United States", "United Kingdom", "Canada"],
            medEasyCountries: ["Ireland", "Germany", "Netherlands", "Belgium", "Spain", "Austria", "France", "Italy"],
            hardCountries: ["China", "Russia", "Japan", "Singapore"],

            // These arrays are used in classic mode to determine the points multiplyer for a certain country
            CountriesInAsia: ["Japan", "Indonesia", "India", "China", "Thailand", "South Korea", "Philippines", "Singapore", "Vietnam", "Malaysia", "Hong Kong", "Saudi Arabia", "Pakistan", "Myanmar", "Cambodia", "Taiwan", "Laos", "Iran", "Sri Lanka", "Israel", "Maldives", "Afghanistan", "Bangladesh", "Nepal", "Qatar", "Mongolia", "Brunei", "Lebanon", "North Korea", "Iraq", "Uzbekistan", "Syria", "Macao", "Christmas Islands", "United Arab Emirates", "Jordan", "Armenia", "Timor-Leste", "Kyrgzstan", "Yemen", "Paliestine", "Bhutan", "Kuwait", "Turkmenistan", "Bahrain", "Tajikistan", "Oman"],
            AfricanCountries: ["Nigeria", "Ethiopia", "Eygpt", "Democratic Republic of the Congo", "Tanzania", "South Africa", "Kenya", "Sudan", "Algeria", "Uganda", "Morocco", "Angola", "Mozambique", "Ghana", "Cameroon", "Madagascar", "Ivory Coast", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Chad", "Somalia", "Zimbabwe", "South Sudan", "Rwanda", "Guinea", "Burundi", "Benin", "Tunisia", "Sierra Leone", "Togo", "Libya", "Repbulic of the Congo", "Central African Republic", "Liberia", "Mauritania", "Eritrea", "Namibia", "Gambia", "Botswana", "Gabon", "Lesotho", "Guimea-Bissau", "Equatorial Guinea", "Mauritius", "Eswatini", "Djibouti", "Cape Verde"],
            EuropeanCountries: ["Hungary", "Belarus", "Austria", "Serbia", "Switzerland", "Germany", "Holy See", "Andorra", "Bulgaria", "United Kingdom", "France", "Montenegro", "Luxembourg", "Italy", "Denmark", "Finland", "Slovakia", "Norway", "Ireland", "Spain", "Malta", "Ukraine", "Croatia", "Moldova", "Monaco", "Liechtenstein", "Poland", "Iceland", "San Marino", "Bosnia and Herzegovina", "Albania", "Lithuania", "North Macedonia", "Slovenia", "Romania", "Latvia", "Netherlands", "Russia", "Estonia", "Belgium", "Czechia", "Portugal", "Greece", "Sweden"],
            NorthAmerica: ["United States", "USA", "United States of America", "Canada", "Mexico"],
            Oceania: ["Australia", "New Zealand"],
            onePointCountries: ["United Kingdom", "United States"],

            // Variables (data, labels and options) for the two charts:
            options: {
                responsive: false,
                maintainAspectRation: false,
                animation: {
                    animateRotate: false
                },
                hoverBorderWidth: 10,
                cutoutPercentage: 90,
            },
            chartData: {
                labels: this.categoryLabels,
                datasets: [
                    {
                        label: "Categories",
                        backgroundColor: ['#9F2B68', '#800020', '#301934', '#CBC3E3', '#AA98A9',  '#673147'],
                        data: this.categoryCounts
                    }
                ]
            },
            countryOptions: {
                responsive: false,
                maintainAspectRation: false,
                animation: {
                    animateRotate: false
                },
                hoverBorderWidth: 10,
                cutoutPercentage: 40,
            },
            countryChartData: {
                labels: this.countryLabels,
                datasets: [
                    {
                        label: "Countries",
                        backgroundColor: ['#228B22', '#808000', '#023020', '#4F7942', '#8A9A5B', '#B4C424', '#C9CC3F'],
                        data: this.countryCounts
                    }
                ]
            },

            // These variables are used to split up the chart data into two different arrays for the labels and the 
            categoryLabels: [],
            categoryCounts: [],

            countryLabels: [],
            countryCounts: [],
        }
    },
    // Data to be passed from the LobbyView.vue component
    props: {
        GameMode: {
            type: String,
            required: true
        },
        startTime: {
          type: Number,
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
        userProfile: {
            type: Object,
            required: true
        },
        playersLobby: {
            type: String,
            required: true
        },
        UsersID: {
            type: String,
            required: true
        },
        multiGameDetails: {
            type: Object,
            required: false
        },
        userMultiContinue: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        // Information box method. Just displays the information on the gamemode to the user. 
        displayInformation(){
            if(this.InformationBox === true){
                this.InformationBox = false;
            }else{
                this.InformationBox = true;
            }
        },
        // This logic occurs whenever the lobby creator hits "Start". Will only fire if all the players are readied up.
        gameSetup(){
            if(this.allPlayersReady){
                console.log("Emitting start game")
                this.$socket.emit('startTheGame', this.playersLobby)
                this.userInAMultiGame = true;
                this.initiateGame();
            }else{
                console.log("Error, not all players ready")
            }
        },
        // This is the logic for ending a game. 
        endGame(){
            var winningScore = 0;
            for(var i = 0; i < this.LobbyUsers.length; i++){
            if(this.LobbyUsers[i].score >= winningScore){
                winningScore = this.LobbyUsers[i].score;
                var winningUser = this.LobbyUsers[i].userID;
                }
            }
            if(winningScore === this.countriesToFind.length){
                 this.WinningUser = winningUser;
            }
            var timePassed = this.startTime - this.timer;
            this.finishedGame = true;
            if(this.GameMode === "Classic"){
                this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, this.userScore, (this.MultiPlayer === true), this.startTime)
            }else if(this.GameMode === "Bingo"){
                for(var j = 0; j < this.countriesToFind.length; j++){
                    if(this.countriesToFind[j].found != true){
                        this.finishedGame = false;
                    }
                }
            if(this.finishedGame){
                this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, timePassed, (this.MultiPlayer === true), this.startTime)
                if(this.WinningUser === this.UsersID){
                    this.didYouWin = true;
                    // This is here to make sure this is only fired once per game, by the winner
                    this.$socket.emit('gameWon', this.UserGoogleID)
                    }
                }
            }
            //Close the Lobby
            this.$socket.emit('closeLobby', this.playersLobby)
            this.gameOver = true;
            if(this.GameMode === 'Bingo'){
                this.endBingoGame();
            }
            this.$socket.emit('endPreviousGames', this.userProfile.userID, this.userProfile.googleID);
        },
        // Additional logic for ending a bingo mode game. 
        endBingoGame(){
            this.$socket.emit('endBingoGame', this.playersLobby, this.UsersID)
            this.$socket.emit('closeLobby', this.playersLobby)
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
            this.gameOver = true;
        },
        // Resets variables and exits user to homepage. 
        exitToHomePageReset(){
            this.gameOver = false;
            this.VisitedCountries = [];
            this.gameSetup = false;
            this.WinningUser = undefined;
            this.didYouWin = false;
            this.$emit('exitToHomePageReset')
        },
        // Logic informs other users that this user is ready. 
        playerReady(){
          this.ProfileOfUser.ready = "Ready";
          for(var i = 0; i< this.LobbyUsers.length; i++){
            if(this.LobbyUsers[i].userID === this.ProfileOfUser.userID){
              this.LobbyUsers[i].ready = "Ready";
            }
          }
          this.$socket.emit('playerReady', this.ProfileOfUser, this.playersLobby);
        },
        // Logic for leaving a game, also fires an event to the server to ensure that other players see that we have left. 
        leaveGame(){
            for(var i = 0; i < this.LobbyUsers.length; i++){
                if(this.LobbyUsers[i].userID === this.UsersID){
                    this.LobbyUsers.splice(i, i+1)
                }
            }
            this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID)
            this.ProfileOfUser.ready = "Not Ready";
            this.gameOver = false;
            this.VisitedCountries = [];
            this.gameSetup = false;
            this.WinningUser = undefined;
            this.didYouWin = false;
            this.exitToHomePageReset();
        },
        // This fires whenever a game is begun. This starts the actual gameplay. 
        initiateGame(){
            var vm = this;
            this.gameStarted = true;
            this.timer = this.startTime;
            if(this.timer <= 0){
                this.timer = 120;
            }
            this.numberOfCookies = 0;
            // This changes the value of the timer, so that the watch logic is initiated.
            this.timer = this.timer * 1;
            this.timer -= 1;
            this.timer += 1;
            // Send a message to the extensions requesting that they reset the gameplay variables to empty, so that we start from a fresh state.
            chrome.runtime.sendMessage({ message: 'reset'}, function(response) {
                if(response === 'success'){
                    vm.VisitedCountries = [];
                    vm.userScore = 0;
                    vm.numberOfCookies = 0;
                    }
                return true;
            })
            // If we're in bingo mode, we create a new list of countries to visit from the three initiated arrays in data(), and then emit this as an event to other users in the lobby.
            if(this.GameMode === "Bingo"){
                this.countriesToFind = [];
                this.countriesToFind.push({country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)], found: false})
                this.countriesToFind.push({country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)], found: false})
                this.countriesToFind.push({country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)], found: false})
                this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind)
            }
            this.initiateListener();
        },
        // Helper method adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        generateRandomIntHelper(max){
            return Math.floor(Math.random() * max)
        },
        // This initiates the event listener, so that we detect if any countries are found by the extension scripts and incorporate this into the gameplay. 
        initiateListener(){
            var vm = this;
            chrome.storage.onChanged.addListener(function(result) {
                if(!(vm.gameOver)){
                    vm.updateListOfCountries()
                    vm.updateAchievements()
                    vm.updateCategories()
                    if(vm.GameMode === "Classic"){
                        vm.updateScoreClassic()
                    }else if(vm.GameMode === "Bingo"){
                        vm.updateScoreBingo()
                    }
                    vm.VisitedCountries = result.countryList.newValue;
                    vm.gameStarted = true;
                }
            }) 
        },
        // Called by the event listener - Updates the list of countries, number of cookies, and achievements for the user upon any change in Chrome storage. 
        updateListOfCountries(){
            var vm = this;       
            chrome.storage.local.get(["countryList"], function(result){
            vm.VisitedCountries = result.countryList;
            chrome.storage.local.get(["numberOfCookies"], function(result){
                vm.numberOfCookies = result;
            })
            chrome.storage.local.get(["achievements"], function(result){
                vm.achievements = result.achievements;
            })
            })
            chrome.storage.local.set({backupCountryList: vm.VisitedCountries});
        },
        // Called by the event listener - Updates the player's achievments. 
        updateAchievements(){
            var vm=this;
            chrome.storage.local.get(["achievements"], function(result){
                vm.achievements = result.achievements;
            })
        },
        // Called by the event listener - Updates the player's categories.
        updateCategories(){
            var vm = this;
            chrome.storage.local.get(["categoryList"], function(result){
                vm.categoryList = result.categoryList;
            })
        },
        // Logic for calculating and updating the user's score for classic mode, and then sending this to the server. 
        updateScoreClassic(){
            var vm = this;
            chrome.storage.local.get(["countryList"], function(result){
                let score = 0;
                for(var i = 0; i < result.countryList.length; i++){
                    if(vm.onePointCountries.includes(result.countryList[i].name)){
                        score += result.countryList[i].count;
                    }else if(vm.EuropeanCountries.includes(result.countryList[i].name) || vm.NorthAmerica.includes(result.countryList[i].name)){
                        score += (result.countryList[i].count)*2;
                    }else if(vm.CountriesInAsia.includes(result.countryList[i])){
                        score += (result.countryList[i].count)*3
                    }else if(vm.AfricanCountries.includes(result.countryList[i])){
                        score += (result.countryList[i].count)*4
                    }else{
                        score += (result.countryList[i].count);
                    }
                }
                vm.userScore = score;
                vm.ProfileOfUser.score = score;
                vm.noOfCountries = result.countryList.length;
                for(var j = 0; j < vm.LobbyUsers.length; j++){
                if(vm.ProfileOfUser.userID === vm.LobbyUsers[j].userID){
                    vm.LobbyUsers[j].score = score;
                    }
                }
            })
            this.$socket.emit('scoreUpdate', this.ProfileOfUser, this.playersLobby, this.userScore);
        },
        // Logic for updating the score on Bingo mode, and then updating this on the server.
        updateScoreBingo(){
            var vm = this;
            chrome.storage.local.get(["countryList"], function(result){
                for(var i = 0; i < result.countryList.length; i++){
                    for(var j = 0; j < vm.countriesToFind.length; j++){
                    if(result.countryList[i].name === vm.countriesToFind[j].country){
                        vm.countriesToFind[j].found = true;
                        }
                    }
                }
                vm.noOfCountries = result.countryList.length;
            })
            var allFound = true;
            // Waiting was included as a means of fixing a bug where the below code is fired before the above
            setTimeout(() => {console.log('done waiting'), 2000})
            for(var j = 0; j < this.countriesToFind.length; j++){
                if(this.countriesToFind[j].found != true){
                allFound = false;
                }else if(!(this.ProfileOfUser.BingoCountries.includes(this.countriesToFind[j])) && this.countriesToFind[j].found === true){
                    this.ProfileOfUser.BingoCountries.push(this.countriesToFind[j])
                }
            }
            this.noOfCountriesBingo = this.ProfileOfUser.BingoCountries.length;
            this.$socket.emit('bingoScoreUpdate', this.ProfileOfUser, this.playersLobby)
            if(allFound){
                this.endBingoGame();
                this.didYouWin = true;
                this.WinningUser = this.ProfileOfUser.userID
            }
        },
    },
    computed: {
        // Below code has been adapted from a tutorial: - M Rybczonek, "How to Create an Animated Countdown Timer With Vue", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022
        formattedTimeLeft(){
            const timeTG = this.timer;
            const minutes = Math.floor(timeTG/60);
            var seconds = timeTG % 60;
            if(seconds < 10){
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`;
        },
        timePassed(){
            return this.startTime - this.timer;
        },
        timeLeft(){
            return this.startTime - (this.startTime - this.timer);
        },
        orderedCountries(){
            return _.orderBy(this.VisitedCountries, 'count', 'desc');
        }
    },
}
</script>

<style>
img.trophy {
    width: 150px;
    height: 150px;
}

p.UserScore {
    font-family: 'digitalFont';
    font-size: 25px;
    color: #20C20E;
    text-align: center;
    left: 85px;
}

ol.BingoPlayers {
    margin-right: 30px;
}
ol.LocatedCountries {
    margin-right: 30px;
}

li.GameUsers {
    font-family: 'digitalFont';
    font-size: 12px;
    color: #20C20E;
    list-style: none;
}
li.BingoList {
    font-size: 12px;
    list-style: none;
}

li.TrackedCountry {
    list-style: none;
}

li.CountriesToFind {
    list-style: none;
    align-items: center;
    margin-right: 30px;
}
li.BingoScores {
    list-style: none; 
    font-family: 'digitalFont';
    font-size: 15px;
    color: #20C20E;
    margin-right: 20px;
}

div.buttonBar {
    position: sticky;
    width: 100%;
    bottom: 0;
}
div.ReadyArea {
    width: 100%;
    margin-right: 10px;
}
img.CountryFlag {
    width: 15px;
    height: 10px;
    float: left;
    margin-right: 10px;
}
label.Guide {
    font-size: 12px;
    color: lightgrey;
}
div.timer {
    margin-left: 20px;
}
</style>