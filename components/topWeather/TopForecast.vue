<template>
  <div class="container">
    <h2>全国天気予報</h2>
    <!--
    <template v-for="weather in topWeathers">
      エリアid:{{ weather.id }}<br>
    </template>
    -->
    
    <topWeatherArea-kushiro />
    <!--
    <topWeatherArea-Asahikawa />
    -->
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
  
  async fetch(){
    /*
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const area = '014100'
    await this.$store.dispatch('forecast/forecast', {url, area})
    */
    //await this.$store.dispatch('forecast/forecastTop')
  },

  computed:{
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
    dateNow: function(){
      return this.$store.state.forecast.dateNow
    },
    timeNow: function(){
      return this.$store.state.forecast.timeNow
    },
    topWeathers: function(){
      return this.$store.getters['forecast/topWeathers']
    }
  },
  
}

</script>