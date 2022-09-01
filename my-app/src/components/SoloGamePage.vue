<!----------
- The SetUsername.vue file is the component responsible for rendering the page for users to set their username upon initial login. 
- Parents: SoloLobby.vue
- Children: BaseTime.vue, PassiveModeChart
------------->
<template>
    <h2>TrackerHunt</h2>
    <p class="HelpText">Solo Mode - {{ GameMode }}<button @click="displayInformation" class="InformationBox" id="Info">i</button></p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Classic'">{{ ClassicInfo }}</p>
    <p class="HelpText" v-if="InformationBox && GameMode==='Bingo'">{{ BingoInfo }}</p>
    <div v-if="(!gameOver)">
        <!---- M Rybczonek, "How to Create an Animated Countdown Timer With Vue", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022-->
        <div class="timer">
            <BaseTimer id="BaseTimer" :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
        </div>
        <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
            <p class="HelpText">Current Score: </p>
            <div class="CountryChart" v-if="VisitedCountries.length != 0">
                <p class="UserScore">{{ this.userScore }}</p>
                <PassiveModeChart ref ="CategoryChart" :chartData="countryChartData" :options="countryOptions" :height="20" :width="200"></PassiveModeChart>
            </div>
            <li v-for="item in orderedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
                <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="CountryText">{{ item.name }} | {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p><p class = "TinyText"> {{ item.site }} </p>
            </li>
            <p class="CookieText">During this session, {{numberOfCookies.numberOfCookies}} tracking cookies have been set on your device.</p>
            <br/>
        </div>
        <div v-if="GameMode === 'Bingo'">
            <label class="Guide">Countries To Locate:</label> 
            <ol>
                <li class="CountriesToFind" v-for="item in countriesToFind" ref="CountriesToFind" :class="{found:item.found}" :key="item">
                    <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + shortenName(item.country) + '.jpeg'"/>{{ item.country }}
                </li>  
            </ol>
            <label class="Guide">Countries Located</label>
            <ol>
            <li v-for="item in VisitedCountries" ref="ListOfCountries" class="BingoList" :key="item">
                <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/>{{ item.name }}
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
            <p>Your score was: </p>
            <div class="CountryChart" v-if="orderedCountries != []">
                <p class="UserScore">{{ this.userScore }}</p>
                <PassiveModeChart ref ="CategoryChart" :chartData="countryChartData" :options="countryOptions" :height="20" :width="200"></PassiveModeChart>
            </div>
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
        <div class="CategoryChart" v-if="categoryList.length != 0">
            <PassiveModeChart ref ="CategoryChart" :chartData="chartData" :options="options" :height="20" :width="200"></PassiveModeChart>
        </div>
        <br/>
        <li v-for="item in categoryList" ref="ListOfCategories" :key="item.name" class="CategoryList">
            {{ item.name }} | {{ item.count }}
        </li>
        <button @click="exitToHomePageReset" type="button">HomePage</button>
    </div>
</template>
<script>
import BaseTimer from "../components/BaseTimer";
import PassiveModeChart from './PassiveModeChart.vue';
import _ from 'lodash';
export default {
    components: {
        BaseTimer,
        PassiveModeChart
    },
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
            // Information Boxes variables
            ClassicInfo: "In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)",
            BingoInfo: "In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game",
            InformationBox: false,

            // Gameplay variables
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
            timer: 124,
            noOfCountries: 0,
            WinningUser: undefined,
            didYouWin: false,
            noOfCountriesBingo: 0,

            categoryLabels: [],
            categoryCounts: [],

            countryLabels: [],
            countryCounts: [],

            // Bingo Mode Variables
            easyCountries: ["United States", "United Kingdom", "Canada"],
            medEasyCountries: [ "Ireland", "Germany", "Netherlands", "Belgium", "Spain", "Belarus", "France", "Czechia", "Poland", "Austria"],
            hardCountries: ["China", "Russia", "Bulgaria", "Japan", "Mexico", "South Korea", "Singapore"],

            // Geolocation of countries, used for Classic mode point calculation.
            CountriesInAsia: ["Japan", "Indonesia", "India", "China", "Thailand", "South Korea", "Philippines", "Singapore", "Vietnam", "Malaysia", "Hong Kong", "Saudi Arabia", "Pakistan", "Myanmar", "Cambodia", "Taiwan", "Laos", "Iran", "Sri Lanka", "Israel", "Maldives", "Afghanistan", "Bangladesh", "Nepal", "Qatar", "Mongolia", "Brunei", "Lebanon", "North Korea", "Iraq", "Uzbekistan", "Syria", "Macao", "Christmas Islands", "United Arab Emirates", "Jordan", "Armenia", "Timor-Leste", "Kyrgzstan", "Yemen", "Paliestine", "Bhutan", "Kuwait", "Turkmenistan", "Bahrain", "Tajikistan", "Oman"],
            AfricanCountries: ["Nigeria", "Ethiopia", "Eygpt", "Democratic Republic of the Congo", "Tanzania", "South Africa", "Kenya", "Sudan", "Algeria", "Uganda", "Morocco", "Angola", "Mozambique", "Ghana", "Cameroon", "Madagascar", "Ivory Coast", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Chad", "Somalia", "Zimbabwe", "South Sudan", "Rwanda", "Guinea", "Burundi", "Benin", "Tunisia", "Sierra Leone", "Togo", "Libya", "Repbulic of the Congo", "Central African Republic", "Liberia", "Mauritania", "Eritrea", "Namibia", "Gambia", "Botswana", "Gabon", "Lesotho", "Guimea-Bissau", "Equatorial Guinea", "Mauritius", "Eswatini", "Djibouti", "Cape Verde"],
            EuropeanCountries: ["Hungary", "Belarus", "Austria", "Serbia", "Switzerland", "Germany", "Holy See", "Andorra", "Bulgaria", "United Kingdom", "France", "Montenegro", "Luxembourg", "Italy", "Denmark", "Finland", "Slovakia", "Norway", "Ireland", "Spain", "Malta", "Ukraine", "Croatia", "Moldova", "Monaco", "Liechtenstein", "Poland", "Iceland", "San Marino", "Bosnia and Herzegovina", "Albania", "Lithuania", "North Macedonia", "Slovenia", "Romania", "Latvia", "Netherlands", "Russia", "Estonia", "Belgium", "Czechia", "Portugal", "Greece", "Sweden"],
            NorthAmerica: ["United States", "USA", "United States of America", "Canada", "Mexico"],
            Oceania: ["Australia", "New Zealand"],
            onePointCountries: ["United Kingdom", "United States"],

            // Chart Data Variables
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
            }
    
        }
    },
    // Before the DOM is re-rendered, this will update the chart data, to ensure that the charts always accurately show the current game state. 
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
    // Fired before the component is rendered. If the user is rejoining a solo game, this will reinitiate the game with the backupGame details. 
    mounted(){
        this.timer = this.startTime;
        var vm = this;
        if(this.userSoloContinue){
            chrome.storage.local.get(['backupGameDetails'], function(result){
                var backupGame = result.backupGameDetails;
                vm.gameStarted = backupGame.gameStarted;
                vm.userScore = backupGame.userScore;
                vm.VisitedCountries = backupGame.VisitedCountries;
                vm.timer = backupGame.timer;
                vm.countriesToFind = backupGame.CountriesToFind;
            })
            this.initiateListener();
            this.timer -= 1;
            this.timer += 1;
            vm.$emit('resetSoloStatus')
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
        userSoloContinue: {
            type: Boolean,
            required: true
        },
        userProfile: {
            type: Object,
            required: true
        }
    },
    methods: {
        // Displays the game information
        displayInformation(){
            if(this.InformationBox === true){
                this.InformationBox = false;
            }else{
                this.InformationBox = true;
            }
        },
        // Initiates the game
        gameSetup(){
            this.initiateGame();
        },
        // Logic for ensuring the successful ending of a game
        endGame(){
            this.WinningUser = this.userProfile;
            var timePassed = this.startTime - this.timer;
            this.gameOver = true;
            this.finishedGame = true;
            if(this.GameMode === "Classic"){
                this.$socket.emit('addScoreToDatabase', this.userProfile.userID, this.GameMode, this.userScore, (this.MultiPlayer === true), this.startTime)
            }else if(this.GameMode === "Bingo"){
                // This checks whether or not the user managed to finish the bingo list.
                for(var j = 0; j < 3; j++){
                    if(this.countriesToFind[j].found != true){
                        this.finishedGame = false;
                        }
                    }   
                if(this.finishedGame){
                    this.$socket.emit('addScoreToDatabase', this.userProfile.userID, this.GameMode, timePassed, (this.MultiPlayer === true), this.startTime)
                }
                if(this.GameMode === 'Bingo'){
                    this.endBingoGame();
                }
            }
            // Once the game ends, these socket emissions ensure the user is no longer recorded as being in any games by the server.
            this.$socket.emit('soloGameFinished', this.userProfile.googleID)
            this.$socket.emit('endPreviousGames', this.userProfile.userID, this.userProfile.googleID);
        },
        // Additional logic to be called whenever a Bingo mode game finishes. 
        endBingoGame(){
            this.didYouWin = true;
            var didUserWin = true;
            for(var i = 0; i < this.countriesToFind.length; i++){
                if(this.countriesToFind[i].found === false){
                    didUserWin = false;
                }
            }
            if(didUserWin){
                this.WinningUser = this.userProfile.userID
                this.didYouWin = true;
                this.finishedGame = true;
                this.noOfCountriesBingo = this.countriesToFind.length;
            }
            this.$socket.emit('soloGameFinished', this.userProfile.googleID)
            this.gameOver = true;
        },
        // Logic for exiting to the Home Page
        exitToHomePageReset(){
            this.$emit('exitToHomePageReset')
            this.gameOver = false;
            this.categoryList = [];
            var vm = this;
            // Resets the gameplay variables in the extension script upon exiting the game
            chrome.runtime.sendMessage({ message: 'reset', function(response) {
                if(response === 'success'){
                    console.log('successfully reset the game.')
                    vm.VisitedCountries = [];
                    vm.userScore = 0;
                    vm.numberOfCookies = 0;
                    vm.categoryList = [];
                }
            }})
        },
         // This fires whenever a game is begun. This starts the actual gameplay. 
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
            // Resetting the gameplay variables in the extension scripts to ensure that we have a fresh start.
            chrome.runtime.sendMessage({ message: 'reset'}, function(response) {
                if(response === 'success'){
                    console.log('successfully started the game.')
                    vm.VisitedCountries = [];
                    vm.userScore = 0;
                    vm.numberOfCookies = 0;
                }
                return true;
            })
            // If Bingo mode, create an array of countries to find. 
            if(this.GameMode === "Bingo"){
                this.countriesToFind = [];
                this.countriesToFind.push({country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)], found: false})
                this.countriesToFind.push({country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)], found: false})
                this.countriesToFind.push({country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)], found: false})
                this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind) // Not sure why this is here? Delete when not as tired.
            }
            // Finally, initiate the event listener.
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
                    vm.backupGameDetails();
                    vm.VisitedCountries = result.countryList.newValue;
                    vm.gameStarted = true;
                }
            }) 
        },
        // Logic is fired by the listener each state change to ensure that the backup details are stored in case the user exits.
        backupGameDetails(){
            var backupGame = {}
            backupGame.GameMode = this.GameMode;
            backupGame.timer = this.timer;
            backupGame.score = this.userScore;
            backupGame.VisitedCountries = this.VisitedCountries;
            backupGame.gameStarted = this.gameStarted;
            if(this.GameMode === "Bingo"){
                backupGame.CountriesToFind = this.countriesToFind;
            }
            chrome.storage.local.set({backupGameDetails: backupGame})
         },
         // Logic is fired by the event listener in order to update the country list and number of cookies of the user
         updateListOfCountries(){
            var vm = this;
            chrome.storage.local.get(["countryList"], function(result){
                vm.VisitedCountries = result.countryList;
            chrome.storage.local.get(["numberOfCookies"], function(result){
                vm.numberOfCookies = result;
                 })
            })
            chrome.storage.local.set({backupCountryList: vm.VisitedCountries});
         },  
         // Logic is fired by the event listener in order to update the achievements for the user.
         updateAchievements(){
            var vm=this;
            chrome.storage.local.get(["achievements"], function(result){
                vm.achievements = result.achievements;
            })
         },
         // Logic is fired by the event listener in order to update the categories for the user.
         updateCategories(){
            var vm = this;
            chrome.storage.local.get(["categoryList"], function(result){
                 vm.categoryList = result.categoryList;
            })
        },
        // Logic is fired by the event listener in classic mode to calculate and update the user's score.
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
                vm.noOfCountries = result.countryList.length;
            })
        },
        // Logic is fired by the event listener in Bingo mode to calculate and update the user's score.
        updateScoreBingo(){
            var vm = this;
            var ProfileOfUser = this.userProfile;
            chrome.storage.local.get(["countryList"], function(result){
                for(var i = 0; i < result.countryList.length; i++){
                    for(var j = 0; j < 3; j++){
                    if(result.countryList[i].name === vm.countriesToFind[j].country){
                        vm.countriesToFind[j].found = true;
                        }
                    }
                }
                vm.noOfCountries = result.countryList.length;
            })
            var allFound = true;
            setTimeout(() => {console.log('done waiting'), 2000})
            for(var k = 0; k < 3; k++){
                if(this.countriesToFind[k].found != true){
                    allFound = false;
                }else if(!(ProfileOfUser.BingoCountries.includes(this.countriesToFind[k])) && this.countriesToFind[k].found === true){
                    ProfileOfUser.BingoCountries.push(this.countriesToFind[k])
                }
            }
            this.noOfCountriesBingo = ProfileOfUser.BingoCountries.length;
            if(allFound && (this.countriesToFind.length != 0)){
                this.endBingoGame();
                this.didYouWin = true;
                this.WinningUser = this.userProfile.userID
                console.log("It's this that's firing");
                console.log(this.countriesToFind)
                console.log(this.countriesToFind.length)
                console.log(allFound);
            }
        },
        // This logic is for displaying flags, and prevents errors whenever the country name has a space in it.
        shortenName(countryName){
            return countryName.replace(/\s/g, '')
        }
       },
    // Below code has been adapted from a tutorial: - M Rybczonek, "How to Create an Animated Countdown Timer With Vue", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022
    computed: {
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
      },
    },
}
</script>
<style>
div.timer {
    margin-right: 0px;
    margin-left: 18px;
}
div.CategoryChart {
    height: 100px;
    width: 100px;
    margin-left: 55px;
    position: relative;
    top: 100;
}

p.UserScore {
    font-family: 'digitalFont';
    font-size: 30px;
    color: #20C20E;
    position: absolute;
    text-align: center;
    margin-left: 30px;
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
    margin-top: 5px;
}
label.Guide {
    font-size: 12px;
    color: lightgrey;
}

li.CountriesToFind {
    list-style: none;
    align-items: center;
    margin-right: 30px;
    font-size: 15px;
    max-width: 80%;
}
li.BingoList {
    margin-right: 30px;
    font-size: 12px;
    color: lightgray;
    align-items: left;
    font-style: italic;
}
</style>