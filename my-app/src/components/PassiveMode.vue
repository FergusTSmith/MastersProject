<template>
    <div v-if="PassivePage">
        <h2>TrackHunt</h2>
        <p class="HelpText">"Passive Mode" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.</p>
        <div class="Chart">
        <PassiveModeChart ref ="PassiveModeChart" :chartData="chartData" :options="options" :height="20" :width="200"></PassiveModeChart>
        </div>
        <p class="Stats">Blocked Requests: {{ passiveModeTotalTrackers}} </p>
        <p class="Stats">Total Requests: {{ totalRequests }}</p>
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
    </div>

    <div v-if="AchievementPage">
        <AchievementsView :achievements="achievements" @backToPassive="backToPassive" @exitToHomePage="exitToHomePage"></AchievementsView>
    </div>

    <div v-if="HostPage">
        <HostsView :passiveModeHosts="passiveModeHosts" @exitToHomePage="exitToHomePage" @HostToPassive="HostToPassive"></HostsView>
    </div>

    <div v-if="CountryPage">
        <CountryView  :passiveCountryLabels="passiveCountryLabels" :passiveCountryCounts="passiveCountryCounts" :passiveModeCountries="passiveModeCountries" @exitToHomePage="exitToHomePage" @CountToPassive="CountToPassive"></CountryView>
    </div>
</template>

<script>
import PassiveModeChart from './PassiveModeChart.vue';
import AchievementsView from '@/components/AchievementsView.vue';
import HostsView from '@/components/HostsView.vue';
import CountryView from '@/components/CountryView.vue';

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
        },
        totalRequests: {
            type: Number,
            required: true
        },
        passiveModeCountries: {
            type: Array,
            required: true
        }
    },
    methods: {
        PassiveToHost(){
            this.PassivePage = false;
            this.HostPage = true;
        },
        PassiveToCountry(){
            this.PassivePage = false;
            this.CountryPage = true;
        },
        achievementPage(){
            this.PassivePage = false;
            this.AchievementPage = true;
        },
        exitToHomePage(){
            this.$emit('exitToHomePage');
            this.CountryPage = false;
            this.AchievementPage = false;
            this.PassivePage = false;
            this.HostPage = false;
        },
        CountToPassive(){
            this.CountryPage = false;
            this.PassivePage = true;
        },
        HostToPassive(){
            this.HostPage = false;
            this.PassivePage = true;
        },
        backToPassive(){
            this.AchievementsPage = false;
            this.PassivePage = true;
        }
    },
    components: {
        PassiveModeChart,
        AchievementsView,
        CountryView,
        HostsView
    },
    data(){
        return {
            totalTrackers: this.passiveModeTotalTrackers,
            totalHosts: this.passiveModeUniqueHosts,
            options: {
                responsive: false,
                maintainAspectRation: false,
                animation: {
                    animateRotate: false
                },
                hoverBorderWidth: 10,
                cutoutPercentage: 40,

            },
            chartData: {
                labels: ['Legitimate Requests', 'Blocked Requests'],
                datasets: [
                    {
                        label: "NumberOfTrackers",
                        backgroundColor: ['darkgreen', '#20C20E'],
                        data: [(this.totalRequests-this.passiveModeTotalTrackers), this.passiveModeTotalTrackers]
                    }
                ]
            },
            achievements: [],
            AchievementPage: false,
            HostPage: false,
            CountryPage: false,
            PassivePage: true,

            passiveCountryCounts: [],
            passiveCountryLabels: [],
            passiveModeHosts: [],

        }
    },
    computed: {
        currentDataSet() {
            return this.chartData.datasets[0].data
        }
    },
    created(){
        //var vm=this;
        console.log(this.totalRequests + "    " + this.passiveModeUniqueHosts)
        var vm=this;
        chrome.storage.local.get(["achievements"], function(result){
            vm.achievements = result.achievements;
            console.log(result);
        })
        console.log(vm.achievements);
        chrome.storage.local.get(["passiveCountryList"], function(result){
                //vm.passiveModeTotalCounties = result.passiveCountryList.length;
                console.log(result);
                for(var i = 0; i < vm.passiveModeCountries.length; i++){
                    vm.passiveCountryCounts[i] = vm.passiveModeCountries[i].count;
                    vm.passiveCountryLabels[i] = vm.passiveModeCountries[i].name;
                }
        })
        chrome.storage.local.get(["passiveHosts"], function(result){
          vm.passiveModeHosts = result.passiveHosts;
        })
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

div.Chart {
    width: 130px;
    height: 130px;
    align-self: center;
    align-items: center;
    margin-left: 23px;
}
</style>