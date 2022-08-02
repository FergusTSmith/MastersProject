<template>
<h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode - {{ GameMode }}<button @click="displayInformation" class="InformationBox">i</button></p>
    <div v-if="(!gameOver)">
    <br/>

    <!-----<p class="timer" ref="timer" id="timer" :class="{timer:timerClose}">Time Remaining: {{ timer }}</p>--->

    <!-----Using a more sophisticated solution for the timer. Adapted from https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f-->
    <BaseTimer :timeToGo="timeLeft" :formattedTimeToGo="formattedTimeLeft" :startTime="startTime" :alertTime="30"></BaseTimer>
    <!------<div class="TimerSection">---->
    <!-----<BaseTimer :timeToGo="timeLeft"/>-->


    <!------</div>--->
    <div v-if="GameMode === 'Classic'" class="ClassicGameMode">
    <p>Current Score: {{ this.userScore }} </p>
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <p class="CountryText">{{ item.name }} | {{ item.count }} |</p><p class = "TinyText"> {{ item.site }} </p>
    </li>
    <p class="CookieText">During this session, {{numberOfCookies.numberOfCookies}} tracking cookies have been set on your device.</p>
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

    <button @click="gameSetup" type="button">Start</button>
    <button @click="endGame" type="button">End Game</button>
    </div>
    
    <div v-if="gameOver">
    <h2 class="GameOver">GAME OVER</h2>
    <div v-if="GameMode === 'Classic'">
    <p>Your score was: {{ this.userScore }}</p>
    <li v-for="item in VisitedCountries" ref="ListOfScores" :key="item.name" class="TrackedCountry">
        <p class="EndScreenText">{{ item.name }} | {{ item.count }} |</p>
    </li>
    </div>
    <div v-if="GameMode === 'Bingo'">
    <p v-if="finishedGame">Well done! You managed to find all of the tracking nations!</p>
    <p v-if="!(finishedGame)">Unfortunately, you did not manage to find the tracking nations in the given time period.</p>
    </div>
    <p class="CategoryText">You were tracked by {{ noOfCountries }} nation(s)</p>
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
        timeLeft: {
            type: Number,
            required: true
        },
        formattedTimeToGo: {
          type: Number,
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
        }

    }
}
</script>