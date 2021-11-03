<template>
    <div>
        <h1>チャート</h1>
        <TestChart />
        <DataChart />
        <barchart :chartdata="chartdata" />
    </div>
</template>

<script>
// jsonデータの読み込み
import Data from '@/assets/chart.json'

export default {
    // jsonデータの処理
    data(){
        return{
            //templateへ受け渡し
            //optionはpluginで設定済み
            chartdata: {
              labels: Data.data.map(data => data.month),
              datasets: [
                  {
                  label: ['Data three'],
                  backgroundColor: '#f87979',
                  data: Data.data.map(data => data.sale)
                  }
              ]
            },
        }
    },
    
}

</script>