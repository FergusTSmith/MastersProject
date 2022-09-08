<!----------
- The PassiveModeChart.vue file is the component responsible for rendering charts on different pages. This was originally named PassiveModeChart.vue as this was originally the only place with charts. However, now this is used in a few different components
- Parents: HomePage.vue
- Children: Doughnut
- This was adapted from two tutorials:
- D Berning, "How To Use Chart.js with Vue.js", digitalocean.com, Available at: https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js, Accessed 02/08/2022
- J Nieto, "Vue Chartjs Doughnut", codesandbox.io, Available at: https://codesandbox.io/s/j47zp73845?file=/src/components/DoughnutExample.vue--, Accessed 02/08/2022
------------->
<template>
    <Doughnut
    :chartData="chartData"
    :options="options" :width="20" :height="20">
    </Doughnut>
</template>
<script>
import { Doughnut } from 'vue-chartjs';
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
    name: 'PassiveModeChart',
})
</script>
<style>
Doughnut {
    width: 20px;
    height: 10px;
}
</style>

