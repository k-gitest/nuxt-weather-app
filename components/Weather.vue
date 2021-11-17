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
                  <th>日付</th>
                  <template v-for="week in weekWeathers.timeDefines">
                  <th>{{ week }}</th>
                  </template>
                </tr>
            </thead>
            <tbody>
              <template v-for="(weekArea,num) in weekWeathers.areas">
                <tr>
                  <td>{{ weekArea.area.name }}</td>
                  <template v-for="(pop,index) in weekArea.pops">
                  <td>
                    降水確率：{{ pop }}％<br>
                    信頼度：{{ weekArea.reliabilities[index] }}<br>
                    最高気温：{{ weekTemps.areas[num].tempsMax[index] }}（{{ weekTemps.areas[num].tempsMaxLower[index] }}～{{ weekTemps.areas[num].tempsMaxUpper[index] }}）<br>
                    最低気温：{{ weekTemps.areas[num].tempsMin[index] }}（{{ weekTemps.areas[num].tempsMinLower[index] }}～{{ weekTemps.areas[num].tempsMinUpper[index] }}）
                  </td>
                  </template>
                </tr>
              </template>
            </tbody>
        </table>
        
        <h2>降水量と気温の向こう七日間平年値</h2>
        <table border=1>
          <thead>
            <tr>
              <template v-for="tempArea in tempAverage">
              <td>{{ tempArea.area.name }}</td>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr>
              <template v-for="(temps, index) in tempAverage">
              <td>
                  最低気温：{{ temps.min }}<br>
                  最高気温：{{ temps.max }}<br>
                  降水量7日間合計：{{ precipAverage[index].min }} - {{ precipAverage[index].max }}mm
              </td>
              </template>
            </tr>
          </tbody>
        </table>
        
    <ul>
      <li v-for="WeatherCode in WeatherCodes">
        {{ WeatherCode[1] }}
      </li>
    </ul>
    <hr>
    <ul>
      <li>
        <template v-for="fore in forec">{{ fore }},</template>
      </li>
    </ul>
    <button @click="hoge(WeatherCodes)">押す</button>
    </div>
</template>

<script>
import axios from 'axios'
import WeatherCodes from '@/assets/weatherCodes.json'

export default{
  data(){
      return{
          weathers: [],
          forec: [],
          WeatherCodes: WeatherCodes,
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
      //天気画像コード取得処理
      hoge: function(samp){
        samp = Object.entries(samp) // objectを配列に変換
        samp.map(f=>{
          const rep = f[1][1].replace('.svg','') //文字列svg削除
          this.forec.push(rep) //配列に追加
          this.forec = Array.from(new Set(this.forec)) //重複要素削除
        })
      },
  },



}

</script>