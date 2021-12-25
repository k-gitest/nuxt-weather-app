<template>

    <div v-cloak>
      <TopForecast />
      <Centers />

    </div>
</template>

<script>
import axios from 'axios'

export default{
  layout: 'original',
  head(){
    return{
      title: 'Aboutのページ',
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: 'Aboutページ説明です'
        }
      ],
      link:[
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
            integrity: 'sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1',
            crossorigin: 'anonymous'
        }
      ],
    }
  },
  data(){
      return{
          subtitle: 'この文書はNuxt.jsでの気象庁のデータについて説明しています。',
      }
  },
}
</script>
