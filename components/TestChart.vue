<script>
// chart.jsはテンプレートを使用しない
// LineやBarなど使用するチャートの読み込み
import { Bar } from 'vue-chartjs'

export default {
  //extendsで使用するチャートの継承
  extends: Bar,
  
  data() {
    return {
      chartData: {
        // labalsが横軸
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            //チャートのタイトル
            label: 'Data One',
            //グラフのカラー
            backgroundColor: '#f87979',
            //チャートデータ配列
            data: [40, 20, 10, 35],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    //dataとoptionでチャートを描画
    this.renderChart(this.chartData, this.options)
  },
}
</script>