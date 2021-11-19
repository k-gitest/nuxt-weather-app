<template>
  <div>
    <template v-for="(center, key) in centers['centers']">
    <ul>
      <li>{{ center.name }}</li>
      <li>{{ center.officeName }}</li>
      <li v-for="item in center.children">
        <a :href="`${ area_name }${ item }.json`" target="_blank">
        <template v-for="(office, area_key) in centers['offices']">
          <template v-if="area_key === item">
            {{office.name}}：{{ office.officeName}}：{{ area_key }}
          </template>
        </template>
        </a>
      </li>
      
    </ul>
    </template>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  data(){
      return{
        centers: [],
        //WeatherCodes: WeatherCodes,
        url: 'https://www.jma.go.jp/bosai/common/const/area.json',
        area: 'overview_forecast/130000.json',
        area_detail: 'forecast/130000.json',
        area_name: 'https://www.jma.go.jp/bosai/forecast/data/forecast/',
      }
  },

  // fetchではthisが可能
  async fetch(){
      //axiosでも取得できる
      this.centers = await axios.get(this.url).then(res=>res.data)
      //this.centers = Object.entries(this.centers)
      console.log(this.centers)
      //storeに格納
      //await this.$store.dispatch('forecast/forecast', {url: this.url, area: this.area_detail})
  },
  computed:{
      forecasts: function() {
          return this.$store.getters['forecast/forecasts']
      },
  },
  methods: {
      are_write: async function(area){
          this.area = area
          this.weathers = await fetch(this.url + this.area).then(res => res.json())
      },
      change_area: async function(area){
          this.area_detail = area
          await this.$store.dispatch('forecast/forecast',{url:this.url, area: this.area_detail})
      },

  },
}
</script>