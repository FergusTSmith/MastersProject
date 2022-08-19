<template>
<h2>TrackerHunt</h2>
    <p class="HelpText">MultiPlayer - {{ GameMode }} <button @click="displayInformation" class="InformationBox">i</button></p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Classic'">{{ ClassicInfo }}</p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Bingo'">{{ BingoInfo }}</p>
    <div v-if="(!gameOver)">
    <br/>
    <!----<label>Time remaining: </label><p> {{ timer }}</p>-->
    <BaseTimer :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
    <br/>
    <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
    <p class="HelpText">Current Score: </p><p class="UserScore">{{ this.userScore }}</p>
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
    <p>Your score was: </p><p class="UserScore">{{ this.userScore }}</p>
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
    <p v-if="APIEnabled" class="CategoryText">During your game, you were tracked when visiting the following categories of pages: </p>
    <li v-for="item in categoryList" ref="ListOfCategories" :key="item.name" class="CategoryList">
        {{ item.name }} | {{ item.count }}
    </li>

    <button @click="exitToHomePageReset" type="button">HomePage</button>
    </div>
    <!--- --<button @click="gameSetup" type="button">Refresh</button> --->
</template>


<script>
import BaseTimer from "../components/BaseTimer";
import _ from 'lodash';
import { objectMethod } from "@babel/types";

export default {
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
    created(){
      this.$socket.open;
      this.$socket.connected;
    },
    mounted(){
        this.LobbyUsers = this.UsersInLobby;
        this.ProfileOfUser = this.userProfile

        this.$socket.emit('getGameDetails', this.multiGameDetails.playersLobby, this.UsersID)
    },
    sockets: {
        player_is_ready(lobbyDetails){
            var allReady = true;
            var user = lobbyDetails[0];
            var lobbyID = lobbyDetails[1];

            if(lobbyID === this.playersLobby){
            for(var i = 0; i < this.LobbyUsers.length; i++){
                console.log(this.LobbyUsers[i]);
                if(this.LobbyUsers[i].userID === user.userID){
                    this.LobbyUsers[i].ready = "Ready";
                }
                if(this.LobbyUsers[i].ready != "Ready"){
                allReady = false;
                }
            }
            }
            if(allReady){
            this.allPlayersReady = true;
            }
            console.log(allReady)
        },
        startGame(lobbyID){
            console.log("Attempting to start game")
            if(lobbyID === this.playersLobby){
                this.initiateGame();
                console.log('success')
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
                this.LobbyUsers = listOfUsers;
                //this.noOfUsersInLobby = this.UsersInLobby.length;
                console.log('we updated the users');
                console.log(this.LobbyUsers);
            }
            console.log(listOfUsers)
        },
        receiveCountriesToVisit(lobbyAndCountries){
            var lobby = lobbyAndCountries[0];
            console.log(lobbyAndCountries)
            
            if(this.playersLobby === lobby && !(this.isLobbyCreator)){
                this.countriesToFind = lobbyAndCountries[1];
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
        },RejoinGame(MessageDetails){
            if(this.UsersID != MessageDetails[4]){
            this.timer = MessageDetails[1];
            this.LobbyUsers = MessageDetails[2];

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
    components: {
        BaseTimer
    },
    data(){
        return {
            ClassicInfo: "In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)",
            BingoInfo: "In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game",
            InformationBox: false,

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
            timer: 120,
            noOfCountries: 0,
            WinningUser: undefined,
            didYouWin: false,
            noOfCountriesBingo: 0,

            allPlayersReady: false,
            LobbyUsers: [],
            ProfileOfUser: undefined,

            easyCountries: ["United States", "United Kingdom"],
            medEasyCountries: ["Canada", "Ireland", "Germany", "Netherlands", "Belgium"],
            hardCountries: ["Russia"],

            CountriesInAsia: ["Japan", "Indonesia", "India", "China", "Thailand", "South Korea", "Philippines", "Singapore", "Vietnam", "Malaysia", "Hong Kong", "Saudi Arabia", "Pakistan", "Myanmar", "Cambodia", "Taiwan", "Laos", "Iran", "Sri Lanka", "Israel", "Maldives", "Afghanistan", "Bangladesh", "Nepal", "Qatar", "Mongolia", "Brunei", "Lebanon", "North Korea", "Iraq", "Uzbekistan", "Syria", "Macao", "Christmas Islands", "United Arab Emirates", "Jordan", "Armenia", "Timor-Leste", "Kyrgzstan", "Yemen", "Paliestine", "Bhutan", "Kuwait", "Turkmenistan", "Bahrain", "Tajikistan", "Oman"],
            AfricanCountries: ["Nigeria", "Ethiopia", "Eygpt", "Democratic Republic of the Congo", "Tanzania", "South Africa", "Kenya", "Sudan", "Algeria", "Uganda", "Morocco", "Angola", "Mozambique", "Ghana", "Cameroon", "Madagascar", "Ivory Coast", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Chad", "Somalia", "Zimbabwe", "South Sudan", "Rwanda", "Guinea", "Burundi", "Benin", "Tunisia", "Sierra Leone", "Togo", "Libya", "Repbulic of the Congo", "Central African Republic", "Liberia", "Mauritania", "Eritrea", "Namibia", "Gambia", "Botswana", "Gabon", "Lesotho", "Guimea-Bissau", "Equatorial Guinea", "Mauritius", "Eswatini", "Djibouti", "Cape Verde"],
            EuropeanCountries: ["Hungary", "Belarus", "Austria", "Serbia", "Switzerland", "Germany", "Holy See", "Andorra", "Bulgaria", "United Kingdom", "France", "Montenegro", "Luxembourg", "Italy", "Denmark", "Finland", "Slovakia", "Norway", "Ireland", "Spain", "Malta", "Ukraine", "Croatia", "Moldova", "Monaco", "Liechtenstein", "Poland", "Iceland", "San Marino", "Bosnia and Herzegovina", "Albania", "Lithuania", "North Macedonia", "Slovenia", "Romania", "Latvia", "Netherlands", "Russia", "Estonia", "Belgium", "Czechia", "Portugal", "Greece", "Sweden"],
            NorthAmerica: ["United States", "USA", "United States of America", "Canada", "Mexico"],
            Oceania: ["Australia", "New Zealand"],
            onePointCountries: ["United Kingdom", "United States"],
        }
    },

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
        }
    },
    methods: {
        displayInformation(){
            if(this.InformationBox === true){
                this.InformationBox = false;
            }else{
                this.InformationBox = true;
            }
        },
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
                        console.log('unfinished')
                    }
                }
            if(this.finishedGame){
                this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, timePassed, (this.MultiPlayer === true), this.startTime)
                console.log('sent bingo score to the server');

                if(this.WinningUser === this.UsersID){
                    this.didYouWin = true;
                    console.log("Winning game won test passed");

                    // This is here to make sure this is only fired once per game, by the winner
                    this.$socket.emit('gameWon', this.UserGoogleID)
            }
            }
            }

            console.log(this.WinningUser);
            console.log(this.UsersID);
            console.log(this.UserGoogleID);

            //Close the Lobby
            this.$socket.emit('closeLobby', this.playersLobby)
            this.gameOver = true;

            if(this.GameMode === 'Bingo'){
                this.endBingoGame();
            }
        },
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

            console.log(this.noOfCountriesBingo)

            this.gameOver = true;
        },
        exitToHomePageReset(){
            this.$emit('exitToHomePageReset')
        },
        playerReady(){
          this.ProfileOfUser.ready = "Ready";
          for(var i = 0; i< this.LobbyUsers.length; i++){
            if(this.LobbyUsers[i].userID === this.ProfileOfUser.userID){
              this.LobbyUsers[i].ready = "Ready";
            }
          }

             console.log("broadcasting player ready");
             console.log(this.playersLobby)
          this.$socket.emit('playerReady', this.ProfileOfUser, this.playersLobby);
      },
        leaveGame(){
            console.log(this.LobbyUsers)
            for(var i = 0; i < this.LobbyUsers.length; i++){
                if(this.LobbyUsers[i].userID === this.UsersID){
                    this.LobbyUsers.splice(i, i+1)
                    console.log("Player deleted")
                    console.log(this.LobbyUsers)
                }
                console.log(this.LobbyUsers);
            }
            console.log(this.LobbyUsers);
            console.log("TESTWER")
            this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID)
            //this.playersLobby = '';
            //this.isLobbyCreator = false;
            this.exitToHomePageReset();
            },
        initiateGame(){
            var vm = this;
            this.gameStarted = true;
            this.timer = this.startTime;
            if(this.timer <= 0){
                this.timer = 120;
            }
            this.numberOfCookies = 0;

            this.timer = this.timer * 1;
            this.timer -= 1;
            this.timer += 1;
            chrome.runtime.sendMessage({ message: 'reset'}, function(response) {
                if(response === 'success'){
                    console.log('successfully started the game.')
                    vm.VisitedCountries = [];
                    vm.userScore = 0;
                    vm.numberOfCookies = 0;
                    }
                return true;
            })
    
            if(this.GameMode === "Bingo"){
                this.countriesToFind = [];
                this.countriesToFind.push({country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)], found: false})
                this.countriesToFind.push({country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)], found: false})
                this.countriesToFind.push({country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)], found: false})
                console.log(this.countriesToFind);
                this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind)

            }
            this.initiateListener();
        },
        generateRandomIntHelper(max){
            return Math.floor(Math.random() * max)
            //Nabbed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        },
        initiateListener(){
            var vm = this;
            
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
            console.log(vm.VisitedCountries);
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
        updateScoreClassic(){
            console.log('Updating score');
            
            var vm = this;

            chrome.storage.local.get(["countryList"], function(result){
                let count = 0
                let score = 0;
                for(var i = 0; i < result.countryList.length; i++){
                    count += result.countryList[i].count;
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
                //vm.noOfUsersInLobby = vm.UsersInLobby.length;
                vm.userScore = score;
                vm.ProfileOfUser.score = score;
                vm.noOfCountries = result.countryList.length;
                console.log(count)

                for(var j = 0; j < vm.LobbyUsers.length; j++){
                if(vm.ProfileOfUser.userID === vm.LobbyUsers[j].userID){
                    vm.LobbyUsers[j].score = score;
                }
                }
            })
            this.$socket.emit('scoreUpdate', this.ProfileOfUser, this.playersLobby, this.userScore);


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
                }else if(!(this.ProfileOfUser.BingoCountries.includes(this.countriesToFind[j])) && this.countriesToFind[j].found === true){
                    this.ProfileOfUser.BingoCountries.push(this.countriesToFind[j])
                }
                console.log(this.countriesToFind[j].found)
            }

            console.log(allFound);
            console.log(this.ProfileOfUser.BingoCountries)
            console.log(this.ProfileOfUser.BingoCountries.length)
            console.log(this.MultiPlayer)
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
      // https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f
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
      },//,
      //orderedCountries: function(){
        //return _.orderBy(this.BingoCountries, 'count')
      //}
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
    margin-top: 0px;
    margin-bottom: 5px;
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
</style>