<template>
<h2>TrackerHunt</h2>
    <p class="HelpText">Solo Mode - {{ GameMode }}<button @click="displayInformation" class="InformationBox" id="Info">i</button></p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Classic'">{{ ClassicInfo }}</p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Bingo'">{{ BingoInfo }}</p>
    <div v-if="(!gameOver)">
    <br/>

    <!-----Using a more sophisticated solution for the timer. Adapted from https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f-->
    <!-----<img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>--->

    <div class="timer">
    <BaseTimer id="BaseTimer" :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
    </div>
    <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
    <p class="HelpText">Current Score: </p><p class="UserScore">{{ this.userScore }}</p>
    <li v-for="item in orderedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="CountryText">{{ item.name }} | {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p><p class = "TinyText"> {{ item.site }} </p>
    </li>
    <p class="CookieText">During this session, {{numberOfCookies.numberOfCookies}} tracking cookies have been set on your device.</p>
    <br/>
    
    </div>
    <div v-if="GameMode === 'Bingo'">
    <label class="Guide">Countries To Locate:</label>
    <ol>
    <li v-for="item in countriesToFind" ref="CountriesToFind" :class="{found:item.found}" :key="item">
        {{ item.country }}
    </li>  
    </ol>
    <label class="Guide">Countries Located</label>
    <ol>
      <li v-for="item in VisitedCountries" ref="ListOfCountries" class="BingoList" :key="item">
          {{ item.name }}
      </li>
    </ol>
    </div>

    <div class="buttonBar">
    <button class="StartSoloGame" id="StartSoloGame" v-if="!(gameStarted)" @click="gameSetup" type="button">Start</button>
    <button id="EndGameButton" @click="endGame()" type="button">End Game</button>
    </div>
    </div>
    
    <div v-if="gameOver">
    <h2 class="GameOver">GAME OVER</h2>
    <div v-if="GameMode === 'Classic'">
    <p>Your score was: </p><p class="UserScore">{{ this.userScore }}</p>
    <li v-for="item in orderedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="EndScreenText"> {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p>
    </li>
    </div>
    <div v-if="GameMode === 'Bingo'">
    <p v-if="finishedGame">Well done! You managed to find all of the tracking nations!</p>
    <p class="GameOverText" v-if="!(finishedGame)">Unfortunately, you did not manage to find the tracking nations in the given time period.</p>
    </div>
    <p class="CategoryText">You were tracked by {{ VisitedCountries.length }} nation(s)</p>
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

export default {
    components: {
        BaseTimer
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
    mounted(){
        this.timer = this.startTime;
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
            this.initiateGame();
        },
        endGame(){
            this.WinningUser = this.userProfile;
            var timePassed = this.startTime - this.timer;
            this.gameOver = true;

            console.log(timePassed)
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
            }

            if(this.GameMode === 'Bingo'){
                this.endBingoGame();
            }

            this.$socket.emit('soloGameFinished', this.UserGoogleID)
            }
        },
        endBingoGame(){
            this.didYouWin = true;
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
        exitToHomePageReset(){
            this.$emit('exitToHomePageReset')
        },
        initiateGame(){
            var vm = this;
            this.gameStarted = true;
            if(this.timer <= 0){
                this.timer = this.startTime;
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
                vm.backupGameDetails();
                vm.VisitedCountries = result.countryList.newValue;
                vm.gameStarted = true;
                }
            }) 
        },
        backupGameDetails(){
            var backupGame = {}
            backupGame.GameMode = this.GameMode;
            backupGame.timer = this.timer;
            backupGame.score = this.userScore;
            backupGame.VisitedCountries = this.VisitedCountries;
            backupGame.gameStarted = this.gameStarted;

            chrome.storage.local.set({backupGameDetails: backupGame})
         },
         updateListOfCountries(){
            var vm = this;
        
            chrome.storage.local.get(["countryList"], function(result){
                vm.VisitedCountries = result.countryList;
                console.log(vm.VisitedCountries);
            chrome.storage.local.get(["numberOfCookies"], function(result){
                vm.numberOfCookies = result;
                //console.log(vm.numberOfCookies);
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
                let count = 0;
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
                vm.userScore = score;
                console.log(count);
                console.log(vm.userScore)
                vm.noOfCountries = result.countryList.length;
            })
        },
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
div.timer {
    margin-right: 30px;
}

p.UserScore {
    font-family: 'digitalFont';
    font-size: 25px;
    color: #20C20E;
    margin-top: 0px;
    margin-bottom: 5px;
}
div.buttonBar {
    position: sticky;
    width: 100%;
    bottom: 0;
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