<!----------
- The CountryView.vue file is the component responsible for rendering the page for the passive mode Countries. 
- Parents: PassiveMode.vue
- Children: PassiveModeChart.vue
------------->
<template>
    <h2>TrackerHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Countries</p>
  <div class="CountryChart">
  <PassiveModeChart ref ="PassiveModeChart" :chartData="chartData" :options="options" :height="20" :width="200"></PassiveModeChart>
  </div>
  <br/>
  <li v-for="item in orderedCountries" :key="item" class="TrackedCountry">
      <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/>{{ item.name }} | {{ item.count }} tracker(s)
  </li>
  <br/>
  <button id="HomePage" @click="exitToHomePage">HomePage</button>
  <button id="Back" @click="CountToPassive">Back</button> 
</template>

<script>
import _ from 'lodash';
import PassiveModeChart from './PassiveModeChart.vue';
export default {
    // The Labels and Counts props are for the chart data. This is just a way of structuring the information into labels and values so that it can be rendered by the chart.
    props: {
        passiveModeCountries: {
            type: Array,
            required: true
        },
        passiveCountryLabels: {
            type: Array,
            required: true
        },
        passiveCountryCounts: {
            type: Array,
            required: true
        }
    },
    methods: {
        // In this instance, both of the methods are just view controller methods. Therefore, they delegate the work of changing this view to the PassiveMode page.
        exitToHomePage(){
            this.$emit('exitToHomePage')
        },
        CountToPassive(){
            this.$emit('CountToPassive')
        }
    },
    computed: {
        // Allows us to order the list of countries by count.
        orderedCountries(){
            return _.orderBy(this.passiveModeCountries, 'count', 'desc');
        }
    },
    components: {
        PassiveModeChart
    },
    data(){
        return {
            labelsArray: [],
            dataArray: [],
            vm: this,
            
            // Options and Data for the Chart:
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
                labels: this.passiveCountryLabels,

                datasets: [
                    {
                        label: "DifferentCountries",
                        backgroundColor: ['darkolivegreen', 'firebrick', 'LightSeaGreen', 'Peru', 'Sienna', 'SlateGrey', 'darkgreen', '#20C20E'],
                        data: this.passiveCountryCounts
                    }
                ]
            }
        }
    },
}
</script>

<style>
div.CountryChart {
    height: 100px;
    width: 100px;
    margin-left: 55px;
}
img.CountryFlag {
    width: 15px;
    height: 10px;
    float: left;
    margin-right: 10px;
}
</style>