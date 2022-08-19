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
    <p class="WinLoss">W/L = {{ gamesWon }}/{{gamesPlayed}}</p>
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
    created(){
        this.intSoloClassLB = this.soloClassicLeaderboard;
        console.log(this.intSoloClassLB)
    },
    data(){
        return {
            intSoloClassLB: [],
            intMultiClassLB: [],

            MultiClassicLB: false,
            SoloClassicLB: true,
        }
    },
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
        },
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