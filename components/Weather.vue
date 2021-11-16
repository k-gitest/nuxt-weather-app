<template>
    <div>
        <ul>
            <li v-for="forecast in forecasts">{{ forecasts }}</li>
        </ul>
        <button @click="change_area(`forecast/130000.json`)">東京詳細</button>
        <button @click="change_area(`overview_forecast/130000.json`)">東京概要</button>
        <ul>
            <li v-for="weather in weathers">{{ weather }}</li>
        </ul>
        <button @click="are_write(`overview_forecast/130000.json`)">東京</button>
        <button @click="are_write(`overview_forecast/140000.json`)">横浜</button>
        <h2>今日・明日・明後日の天気予報</h2>
        <table border=1>
            <template v-for="(timeDefine, index) in timeWeathers.timeDefines">
            <thead>
                <tr>
                    <th>{{ timeDefine }}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(areas, num) in timeWeathers.areas">
                <tr>
                    <td>
                        {{ areas.area.name }}<br>
                        天気：{{ areas.weathers[index] }}<br>
                        波：{{ areas.waves[index] }}<br>
                        風：{{ areas.winds[index] }}<br>
                        最低気温：{{ timeTemps.areas[num].temps[0] }}度<br>
                        最高気温：{{ timeTemps.areas[num].temps[1] }}度
                        
                        <table border=1>
                            <thead>
                                <tr>
                                    <template v-for="timePop in timePops.timeDefines">
                                    <th>{{ timePop }}</th>
                                    </template>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <template v-for="pop in timePops.areas[num].pops">
                                    <td>{{ pop }}%</td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </template>
            </tbody>
            </template>
        </table>
        <h2>週間天気予報</h2>
        <table border=1>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
        
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