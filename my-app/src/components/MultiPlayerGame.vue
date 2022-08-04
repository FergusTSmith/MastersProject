<template>
<h2>TrackHunt</h2>
    <p class="HelpText">MultiPlayer - {{ GameMode }} <button @click="displayInformation" class="InformationBox">i</button></p>
    <div v-if="(!gameOver)">
    <br/>
    <!----<label>Time remaining: </label><p> {{ timer }}</p>-->
    <BaseTimer :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
    <br/>
    <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
    <p class="HelpText">Current Score: </p><p class="UserScore">{{ this.userScore }}</p>
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item" class="TrackedCountry">
        <p class="CountryText">{{ item.name }} | {{ item.count }} |</p><p class = "TinyText"> {{ item.site }} </p>
    </li>
    <br/>
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
    <div class="ReadyArea">
    <ol v-if="!(allPlayersReady)">
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="GameUsers" :key="item">
        {{ item.userID }} - {{ item.ready }}
    </li>
    </ol>
    <ol v-if="allPlayersReady && !(gameStarted)">
        <li class="GameUsers">All players are ready</li>
    </ol>
    <ol v-if="allPlayersReady && (gameStarted) && (GameMode === 'Bingo')">
    <li v-for="item in UsersInLobby" ref="BingoScores" class="GamesUsers" :key="item">
        {{ item.userID }} | {{ item.BingoCountries.length }}
    </li>
    </ol>
    </div>
    
    <div v-if="GameMode === 'Classic' && (gameStarted)">
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="GameUsers" :key="item">
        {{ item.userID }} - {{ item.score }}
    </li>
    </div>
    <p class="CookieText">During this session, {{numberOfCookies.numberOfCookies}} tracking cookies have been set on your device.</p>
    <p class="ErrorText" v-if="playerLeaveMessage != 'false'"> {{ playerLeaveMessage }}</p>
    <div class="buttonBar">
    <button v-if="isLobbyCreator" @click="gameSetup" type="button">Start</button>
    <button v-if="!(allPlayersReady)" @click="playerReady">Ready Up</button>
    <button @click="leaveGame" type="button">Leave Game</button>
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
    <p>Your score was: {{ this.userScore }}</p>
    <div class="GameResults">
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <p class="CountryText">{{ item.name }} | {{ item.count }} |</p><p class = "TinyText"> {{ item.site }} </p>
    </li>
    <li v-for="item in UsersInLobby" ref="ListOfScores" class="GameUsers" :key="item">
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

export default {
    components: {
        BaseTimer
    },

    props: {
        GameMode: {
            type: String,
            required: true
        },
        gameOver: {
            type: Boolean,
            required: true
        },
        startTime: {
          type: Number,
          required: true
        },
        userScore: {
            type: Number,
            required: true
        },
        VisitedCountries: {
            type: Array,
            required: true
        },
        numberOfCookies: {
            type: Number,
            required: true
        },
        countriesToFind: {
            type: Array,
            required: true
        },
        finishedGame: {
            type: Boolean,
            requried: false
        },
        APIEnabled: {
            type: Boolean,
            required: false
        },
        timer: {
            type: Number,
            required: true
        },
        allPlayersReady: {
            type: Boolean,
            required: true
        },
        gameStarted: {
            type: Boolean,
            required: true
        },UsersInLobby: {
            type: Array,
            required: true
        },
        categoryList: {
            type: Array,
            required: true
        },
        isLobbyCreator: {
            type: Boolean,
            required: true
        },
        didYouWin: {
            type: Boolean,
            required: true
        },
        WinningUser: {
            type: String,
            required: true
        },
        noOfCountries: {
            type: Number,
            required: true
        },
        noOfCountriesBingo: {
            type: Number,
            required: true
        }

    },
    methods: {
        displayInformation(){
            if(this.GameMode === "Classic"){
                alert("In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU nations \n Rare Countries (x3 Multiplyer): Russia \n Very Rare Countries (x5 Multiplyer): All other countries");
            }else{
                alert("In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game")
            }
        },
        gameSetup(){
            this.$emit('gameSetup')
        },
        endGame(){
            this.$emit('endGame')
        },
        exitToHomePageReset(){
            this.$emit('exitToHomePageReset')
        },
        playerReady(){
            this.$emit('playerReady')
        },
        leaveGame(){
            this.$emit('leaveGame')
        }
 
            
        
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

li.GameUsers {
    font-family: 'digitalFont';
    font-size: 12px;
    color: #20C20E;
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
</style>