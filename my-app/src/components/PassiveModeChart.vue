<!----Adapted from https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js & https://codesandbox.io/s/j47zp73845?file=/src/components/DoughnutExample.vue-->
<template>
    <Doughnut
    :chartData="chartData"
    :options="options" :width="20" :height="20">
    
    </Doughnut>
</template>


<script>
import { Doughnut, mixins } from 'vue-chartjs';
//import { Chart, generateChart } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js'
ChartJS.register(ArcElement, Tooltip)


export default ({
    extends: {Doughnut},
    mixins: [Doughnut],
    props: {
        chartData: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            required: true
        }
    },
    components: {Doughnut},
    methods: {
        update(){
            this.$data._chart.update();
        }
    },
    name: 'PassiveModeChart',
    mounted(){
        //this.renderChart(this.chartData, this.options)
        console.log(this.chartData);
    }
})
</script>

<style>
Doughnut {
    width: 20px;
    height: 10px;
}
</style>

