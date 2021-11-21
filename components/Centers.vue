<template>
  <div>
    
    <template v-for="(center, key) in centers">
    <ul>
      <li>{{ center.name }}</li>
      <li>{{ center.officeName }}</li>
      <li v-for="item in center.children">

        <nuxt-link :to="`forecast/${ item }`">
        <template v-for="(office, area_key) in offices">
          <template v-if="area_key === item">
            {{office.name}}：{{ office.officeName}}：{{ area_key }}<br>
            <template v-for="child in office.children">
              {{ child }}<br>
            </template>
          </template>
        </template>
        </nuxt-link>
        
        <template>
          {{ offices[item].name }}:{{ offices[item].children }}<br>
          <template v-for="child in offices[item].children">
            child:{{child}}<br>
            </template>
        </template>
        
        <template v-for="office_child in offices[item].children">
          {{ class10s[office_child].parent}}<br>
          {{ class10s[office_child].name }}:{{ class10s[office_child].children}}<br>
          
          <template v-for="class10_child in class10s[office_child].children">
            {{ class15s[class10_child].parent}}<br>
            {{ class15s[class10_child].name }}:{{ class15s[class10_child].children}}<br>
            
            <template v-for="class15_child in class15s[class10_child].children">
              {{ class20s[class15_child].parent }}<br>
              {{ class20s[class15_child].name }}:{{ class20s[class15_child].children }}<br>
            </template>
            
          </template>
          
        </template>

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
      //centers: [],
      //WeatherCodes: WeatherCodes,
      url: 'https://www.jma.go.jp/bosai/common/const/area.json',
      area: 'overview_forecast/130000.json',
      area_detail: 'forecast/130000.json',
      area_name: 'https://www.jma.go.jp/bosai/forecast/data/forecast/',
    }
  },

  async fetch(){
    //this.centers = await axios.get(this.url).then(res=>res.data)
    //this.centers = Object.entries(this.centers)
    //console.log(this.centers)
    await this.$store.dispatch('forecast/forecastIndex')
  },
  computed:{
    forecasts: function() {
        return this.$store.getters['forecast/forecasts']
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
    }
    /*
    centers: function(){
      return this.$store.state.forecast.centers
    }
    */
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