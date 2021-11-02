<template>
    <div>
        <h1>チャート</h1>
        <TestChart />
        <DataChart />
    </div>
</template>

<script>
// チャートコンポーネントの読み込み
import TestChart from '@/components/TestChart.vue'
import DataChart from '@/components/DataChart.vue'

export default {
    components: {
        TestChart,
        DataChart,
    },
}

</script>