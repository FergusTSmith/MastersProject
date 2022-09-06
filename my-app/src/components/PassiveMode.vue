<!----------
- The PassiveMode.vue file is the component responsible for rendering the passive mode statistics and charts for the user. 
- Parents: HomePageView.vue
- Children: PassiveModeChart.vue, AchievementsView.vue, HostsView.vue, CountryView.vue
------------->
<template>
    <div v-if="PassivePage">
        <h2>TrackerHunt</h2>
        <p class="HelpText">"Passive Mode" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.</p>
        <div class="Chart">
            <PassiveModeChart ref ="PassiveModeChart" :chartData="chartData" :options="options" :height="20" :width="200" :key="totalRequests"></PassiveModeChart>
        </div>
        <p class="Stats">Blocked Requests: {{ passiveModeTotalTrackers}} </p>
        <p class="Stats">Total Requests: {{ totalRequests }}</p>
        <p class="PassiveText">Since you installed TackerHunt, you have been tracked: {{ passiveModeTotalTrackers }} times. This means that, whilst browsing, your browser submitted requests to {{ passiveModeTotalTrackers }} different tracking URLs</p>
        <p class="PassiveText">This was done by a total of {{ passiveModeUniqueHosts }} different entities.</p>
        <p class="PassiveText">These entities hailed from {{ passiveModeTotalCounties }} countries.</p>
        <p class="PassiveText">While browsing, you were tracked when visiting the following categories of pages: </p>
        <div class="CategoryChart">
            <PassiveModeChart ref ="PassiveModeChart" :chartData="categoryChartData" :options="options" :height="20" :width="200"></PassiveModeChart>
        </div>
        <ol class="CategoryList">
            <li v-for="item in passiveCategoryList" ref="ListOfCategories" :key="item.name" class="CategoryList">
                {{ item.name }} | {{ item.count }}
            </li>
        </ol>
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
    // These props are retrieved and passed by hte HomePageView.vue component.
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
        },
        passiveCategoryList: {
            type: Array,
            required: true
        }
    },
    methods: {
        // The following methods are view controllers, and are in charge of rendering the child components.
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
        // This is to reset the page back to the Home Page.
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
            this.AchievementPage = false;
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
            // Variables are for the chart data in order to render the two charts.
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
            categoryChartData: {
                labels: this.categoryLabels,
                datasets: [
                    {
                        label: "Categories",
                        backgroundColor: ['#9F2B68', '#800020', '#301934', '#CBC3E3', '#AA98A9',  '#673147'],
                        data: this.categoryCounts,
                    }
                ]
            },
            // Initialisation of variables required for displaying the passive statistics to the user. 
            achievements: [],
            AchievementPage: false,
            HostPage: false,
            CountryPage: false,
            PassivePage: true,

            passiveCountryCounts: [],
            passiveCountryLabels: [],
            passiveModeHosts: [],
            pastTrackingNumbers: [],

            categoryLabels: [],
            categoryCounts: [],

            key: 0,
        }
    },
    computed: {
        currentDataSet() {
            return this.chartData.datasets[0].data
        }
    },
    // Logic is fired before the updating of the render. Ensures that the chart data is available within data() before rendering, meaning the charts are rendered on the first visit. Also retrieves and initialises all the required variables. 
    beforeUpdate(){
        for(var i = 0; i < this.passiveCategoryList.length; i++){
            this.categoryLabels[i] = this.passiveCategoryList[i].name;
            this.categoryCounts[i] = this.passiveCategoryList[i].count;
        }
        this.categoryChartData.labels = this.categoryLabels;
        this.categoryChartData.datasets[0].data = this.categoryCounts;
        this.chartData.datasets[0].data = [(this.totalRequests-this.passiveModeTotalTrackers), this.passiveModeTotalTrackers]
        this.key++;
        var vm=this;
        chrome.storage.local.get(["achievements"], function(result){
            vm.achievements = result.achievements;
        })
        chrome.storage.local.get(["passiveCountryList"], function(result){
            for(var i = 0; i < vm.passiveModeCountries.length; i++){
                vm.passiveCountryCounts[i] = vm.passiveModeCountries[i].count;
                vm.passiveCountryLabels[i] = vm.passiveModeCountries[i].name;
            }
            console.log(result);
        })
        chrome.storage.local.get(["passiveHosts"], function(result){
            vm.passiveModeHosts = result.passiveHosts;
        })
        chrome.storage.local.get(["pastTrackingNumbers"], function(result){
            vm.pastTrackingNumbers = result.pastTrackingNumbers;
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
ol.CategoryList {
    margin-right: 35px;
}
button.passiveButton {
    width: 80%;
    font-weight: bold;
    font-size: 11px;
}
p.Stats {
    font-family: 'digitalFont';
    color: #20C20E;
    font-size: 20px;
}
p.HelpText {
    font-size: 9x;
    color: lightgray;
}
div.Chart {
    width: 130px;
    height: 130px;
    align-self: center;
    align-items: center;
    margin-left: 35px;
}
</style>