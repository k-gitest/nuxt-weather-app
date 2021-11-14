<template>
    <div>
        <ul>
            <li v-for="forecast in forecasts">{{ forecast }}</li>
        </ul>
        <button @click="change_area(`forecast/130000.json`)">東京詳細</button>
        <button @click="change_area(`overview_forecast/130000.json`)">東京概要</button>
        <ul>
            <li v-for="weather in weathers">{{ weather }}</li>
        </ul>
        <button @click="are_write(`overview_forecast/130000.json`)">東京</button>
        <button @click="are_write(`overview_forecast/140000.json`)">横浜</button>
    </div>
</template>

<script>
import axios from 'axios'

export default{
  data(){
      return{
          weathers: [],
          url: 'https://www.jma.go.jp/bosai/forecast/data/',
          area: 'overview_forecast/130000.json',
          area_detail: 'forecast/130000.json'
      }
  },
  // fetchではthisが可能
  async fetch(){
      //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
      //this.weathers = await fetch(this.url + this.area).then(res => res.json())
      //axiosでも取得できる
      this.weathers = await axios.get(this.url + this.area).then(res=>res.data)
      //storeに格納
      await this.$store.dispatch('forecast/forecast', {url: this.url, area: this.area_detail})
  },
  computed:{
      forecasts: function() {
          return this.$store.state.forecast.forecasts
      }
  },
  methods: {
      are_write: async function(area){
          this.area = area
          this.weathers = await fetch(this.url + this.area).then(res => res.json())
      },
      change_area: async function(area){
          this.area_detail = area
          await this.$store.dispatch('forecast/forecast',{url:this.url, area: this.area_detail})
      }
  },
  mounted(){
      //storeに格納する場合
      //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
      //const area = 'overview_forecast/130000.json'
      //this.$store.dispatch('forecast/forecast', {url: this.url, area: this.area})
  }

}

</script>