<template>
<h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode - {{ GameMode }}<button @click="displayInformation" class="InformationBox">i</button></p>
    <div v-if="(!gameOver)">
    <br/>

    <!-----Using a more sophisticated solution for the timer. Adapted from https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f-->
    <!-----<img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>--->

    <div class="timer">
    <BaseTimer :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
    </div>
    <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
    <p class="HelpText">Current Score: </p><p class="UserScore">{{ this.userScore }}</p>
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
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
    <button @click="gameSetup" type="button">Start</button>
    <button @click="endGame" type="button">End Game</button>
    </div>
    </div>
    
    <div v-if="gameOver">
    <h2 class="GameOver">GAME OVER</h2>
    <div v-if="GameMode === 'Classic'">
    <p>Your score was: </p><p class="UserScore">{{ this.userScore }}</p>
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/><p class="EndScreenText">| {{ item.count }} tracker(s) | {{ item.multiplyer*item.count }} point(s)</p>
    </li>
    </div>
    <div v-if="GameMode === 'Bingo'">
    <p v-if="finishedGame">Well done! You managed to find all of the tracking nations!</p>
    <p v-if="!(finishedGame)">Unfortunately, you did not manage to find the tracking nations in the given time period.</p>
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
        categoryList: {
            type: Array,
            required: true
        }

    },
    methods: {
        displayInformation(){
            if(this.GameMode === "Classic"){
                alert("In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)");
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