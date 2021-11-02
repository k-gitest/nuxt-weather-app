import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('BarChart', {
    extends: Bar,
    props: {
        chartdata: {
            type: Object,
        },
        options: {
            type: Object,
            default:() => ({
                responsive: true,
                maintainAspectRatio: false
            })
        }
    },
    mounted(){
        this.renderChart(this.chartdata, this.options)
    }
})
