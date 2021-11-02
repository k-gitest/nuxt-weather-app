<script>
import Data from '@/assets/chart.json'
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    data(){
        return {
            chartdata: {
                labels: Data.data.map(data => data.month),
                datasets: [
                        {
                            label: ['Data two'],
                            backgroundColor: '#f87979',
                            data: Data.data.map(data => data.sale)
                        }
                    ]
            },
            options: {
                responsive: true,
                aspectRatio: false,
            }
        }
    },
    mounted(){
        this.renderChart(this.chartdata, this.options)
    }
}
</script>