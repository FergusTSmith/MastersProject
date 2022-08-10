<!----Adapted from https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js & https://codesandbox.io/s/j47zp73845?file=/src/components/DoughnutExample.vue-->

<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        chartData: {
            type: Array,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    methods: {
        update(){
            this.$data._chart.update();
        }
    },
    name: 'PassiveModeChart',
    mounted(){
        this.renderChart(this.chartData, this.options)
    }
}
</script>