<template>
  <div class="container">
    {{area}}
  </div>
</template>

<script>
import WeatherCodes from '@/assets/weatherCodes.json'
import axios from 'axios'

export default{
  data(){
    return{
      WeatherCodes: WeatherCodes,
    }
  },
  props: {
    'area': {
      type: String,
      default: '',
      required: false
    }
  },
  
  async fetch({area}){
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    //console.log(area)
    await this.$store.dispatch('forecast/forecast', {url,area})
  },
  
  computed:{
    forecasts: function() {
        return this.$store.getters['forecast/forecasts']
    },
    timeWeathers: function(){
        return this.$store.getters['forecast/timeWeathers']
    },
    timeTemps: function(){
        return this.$store.getters['forecast/timeTemps']
    },
    timePops: function(){
        return this.$store.getters['forecast/timePops']
    },
    weekWeathers: function(){
      return this.$store.getters['forecast/weekWeathers']
    },
    weekTemps: function(){
      return this.$store.getters['forecast/weekTemps']
    },
    tempAverage: function(){
      return this.$store.getters['forecast/tempAverage']
    },
    precipAverage: function(){
      return this.$store.getters['forecast/precipAverage']
    },
    dateNow: function(){
      return this.$store.state.forecast.dateNow
    },
    timeNow: function(){
      return this.$store.state.forecast.timeNow
    },
    overview: function(){
      return this.$store.state.forecast.overview
    },
    centers: function(){
      return this.$store.getters['forecast/centers']
    },
    offices: function(){
      return this.$store.getters['forecast/offices']
    },
    class10s: function(){
      return this.$store.getters['forecast/class10s']
    },
    class15s: function(){
      return this.$store.getters['forecast/class15s']
    },
    class20s: function(){
      return this.$store.getters['forecast/class20s']
    },
    recentTime: function(){
      return this.$store.getters['forecast/recentTime']
    },
    popTime: function(){
      return this.$store.getters['forecast/popTime']
    },
    weekTime: function(){
      return this.$store.getters['forecast/weekTime']
    },
    area_details: function(){
      return this.$store.getters['forecast/area_details']
    },
    area_id: function(){
      return this.$store.getters['forecast/area_id']
    },
  },
}

</script>


