import Vue from 'vue'
import { Bar } from 'vue-chartjs'

//pluginを使ったチャート表示
Vue.component('barchart', {
    extends: Bar,
    //propsでデータを受け渡す
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
