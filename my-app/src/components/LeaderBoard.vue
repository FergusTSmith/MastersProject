<!----------
- The LeaderBoard.vue file is the component responsible for rendering the page for the leaderboards.
- Parents: HomePage.vue
- Children: None
- This receives the leaderboards as props, assigns these to new variables so that they can be manipulated. 
------------->
<template>
    <h2>TrackerHunt</h2><br/>
        <p class="HelpText">LeaderBoards - Classic Mode</p>
        <button id="solo" @click="displaySoloClass" class="Radio" type="button">Solo</button>
        <button id="multi" @click="displayMulClass" class="Radio" type="button">MultiPlayer</button>
        <p>Username   |   Score   |  Date </p>
        <ol v-if="MultiClassicLB">
        <li id="MultiBoard" v-for="item in intMultiClassLB" :key="item" class="LeaderBoard">
            {{ item.username }}  |  {{ item.Score }}  |  {{ item.createdAt }}
        </li>
        </ol>
        <ol v-if="SoloClassicLB">
        <!------Putt the W/L ratio here-->
        <p class="WinLoss">W/L = {{ gamesWon }}/{{gamesPlayed - gamesWon}}</p>
        <li id="SoloBoard" v-for="item in intSoloClassLB" :key="item" class="LeaderBoard">
            {{ item.username }}  |  {{ item.Score }}  |  {{ item.createdAt }}
        </li>
        </ol>
        <div id="Leaderboard">
        </div>
        <button id="twoMin" @click="twoMinLB" class="TimeButton" type="button">2 min</button>
        <button id="fiveMin" @click="fiveMinLB" class="TimeButton" type="button">5 min</button>
        <button id="tenMin" @click="tenMinLB" class="TimeButton" type="button">10 min</button>
        <br/>
</template>

<script>
export default {
    // When the component is first created, we take the props and assign these to new variables, so that there is a board displayed to the user upon opening. By default, this is the solo leaderboard. 
    created(){
        this.intSoloClassLB = this.soloClassicLeaderboard;
    },
    data(){
        return {
            intSoloClassLB: [],
            intMultiClassLB: [],

            MultiClassicLB: false,
            SoloClassicLB: true,
        }
    },
    // Props to be passed by the HomePage.vue component. 
    props: {
        personalSoloHS: {
            type: Array,
            required: true
        },
        soloClassicLeaderboard: {
            type: Array,
            required: true
        }, multiClassicLeaderboard: {
            type: Array,
            required: true
        }, gamesWon: {
            type: Number,
            required: true
        }, gamesPlayed: {
            type: Number,
            required: true
        }
    },
    methods: {
        // Manipulates the leaderboard to show two minute scores. 
        twoMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 120);
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 120);
            },
        // Manipulates the leaderboard to show five minute scores. 
        fiveMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 300);
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 300);
            },
        // Manipulates the leaderboard to show ten minute scores. 
        tenMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 600)
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 600);
        },
        // View controllers, to switch between displaying leaderboards for solo games and for multiplayer games. 
        displaySoloClass(){
            this.MultiClassicLB = false;
            this.SoloClassicLB = true;
        },
        displayMulClass(){
            this.MultiClassicLB = true;
            this.SoloClassicLB = false;
        },
    }
}</script>

<style>
p.WinLoss {
    margin-right: 30px;
    color: lightgray;
    font-size: 11px;

}
</style>