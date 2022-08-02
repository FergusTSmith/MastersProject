<template>
<h2>TrackHunt</h2><br/>
    <p class="HelpText">LeaderBoards</p>
    <button @click="displaySoloClass" class="Radio" type="button">Solo Classic</button>
    <button @click="displayMulClass" class="Radio" type="button">Multi Classic</button>
    <p>Username   |   Score   |  Date </p>
    <ol v-if="MultiClassicLB">
    <li v-for="item in intMultiClassLB" :key="item" class="LeaderBoard">
        {{ item.username }}  |  {{ item.Score }}  |  {{ item.createdAt }}
    </li>
    </ol>
    <ol v-if="SoloClassicLB">
    <!------Putt the W/L ratio here-->
    <p class="HelpText">W/L = {{ gamesWon }}/{{gamesPlayed}}</p>
    <li v-for="item in intSoloClassLB" :key="item" class="LeaderBoard">
        {{ item.username }}  |  {{ item.Score }}  |  {{ item.createdAt }}
    </li>
    </ol>
    <div id="Leaderboard">
    </div>
    <button @click="twoMinLB" class="TimeButton" type="button">2 min</button>
    <button @click="fiveMinLB" class="TimeButton" type="button">5 min</button>
    <button @click="tenMinLB" class="TimeButton" type="button">10 min</button>
    <br/>
</template>

<script>
export default {
    props: {
        intSoloClassLB: {
            type: Array,
            required: true
        },
        intMultiClassLB: {
            type: Array,
            required: true
        }, 
        soloClassicLeaderboard: {
            type: Array,
            required: true
        }, multiClassicLeaderboard: {
            type: Array,
            required: true
        }
    },
    methods: {
        twoMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 120);
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 120);
            },
        fiveMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 300);
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 300);
            },
        tenMinLB(){
            this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 600)
            this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 600);
        }
    }
    
}</script>