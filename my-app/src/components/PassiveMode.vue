<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">"Passive Mode" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.</p>
    <PassiveModeChart ref ="PassiveModeChart" :chartData="chartData" :options="options"></PassiveModeChart>
    <p class="Stats">Blocked Requests: {{ passiveModeTotalTrackers}} </p>
    <p class="Stats">Total Requests: 123</p>
    <p class="PassiveText">Since you installed TackerHunt, you have been tracked: {{ passiveModeTotalTrackers }} times. This means that, whilst browsing, your browser submitted requests to {{ passiveModeTotalTrackers }} different tracking URLs</p>
    <p class="PassiveText">This was done by a total of {{ passiveModeUniqueHosts }} different entities.</p>
    <p class="PassiveText">These entities hailed from {{ passiveModeTotalCounties }} countries.</p>
    <p class="PassiveText">To see a complete list of hosts and counts: </p>
    <button class="passiveButton" @click="PassiveToHost">PassiveMode Hosts</button>
    <p class="PassiveText">To see a complete list of countries and counts: </p>
    <button class="passiveButton" @click="PassiveToCountry">PassiveMode Countries</button>
    <p class="PassiveText">To view your achievements: </p>
    <button class="passiveButton" @click="achievementPage">Achievements</button>
    <br/>
    <button class="passiveButton" @click="exitToHomePage">HomePage</button>
</template>

<script>
import PassiveModeChart from './PassiveModeChart.vue';

const options = {
    responsive: true,
    maintainAspectRation: false,
    animation: {
        animateRotate: false
    }
}

export default {
    props: {
        passiveModeTotalTrackers: {
            type: Number,
            required: true
        },
        passiveModeUniqueHosts: {
            type: Number,
            required: true
        },
        passiveModeTotalCounties: {
            type: Number,
            required: true
        }
    },
    methods: {
        PassiveToHost(){
            this.$emit('PassiveToHost');
        },
        PassiveToCountry(){
            this.$emit('PassiveToCountry');
        },
        achievementPage(){
            this.$emit('achievementPage');
        },
        exitToHomePage(){
            this.$emit('exitToHomePage');
        }
    },
    components: {
        PassiveModeChart
    },
    data(){
        return {
            options,
            chartData: {
                labels: ['NumberOfRequests', 'NumberOfBlockedRequests'],
                datasets: [
                    {
                        backgroundColor: ['#2f4f4f'],
                        data: [1]
                    }
                ]
            }
        }
    },
    computed: {
        currentDataSet() {
            return this.chartData.datasets[0].data
        }
    }
}
</script>

<style>
p.PassiveText{
  color: white;
  font-size: 12px;
  text-align: justify;
  display: flex;
}

button.passiveButton {
    width: 80%;
    font-weight: bold;
    font-size: 11px;
}
p.stats {
    float: left;
}
</style>