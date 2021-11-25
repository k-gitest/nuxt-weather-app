<template>
    <div class="container">
        <h2>今日・明日・明後日の天気予報</h2>
        <h3>{{forecasts[0].reportDatetime}} : {{ forecasts[0].publishingOffice }} 発表</h3>
        <table border=1 class="table">
          <template v-for="(timeDefine, index) in timeWeathers.timeDefines">
            <thead>
              <tr>
                <th>{{ timeNow[index] }}</th>
              </tr>
            </thead>
          <tbody>
            <template v-for="(areas, num) in timeWeathers.areas">
            <template v-if="$route.query.area_detail && areas.area.code === $route.query.area_detail">
            <tr>
              <td>
                {{ areas.area.name }}<br>
                <img :src="require(`@/assets/img/`+WeatherCodes[areas.weatherCodes[index]][0])" /><br>
                天気：{{ areas.weathers[index] }}<br>
                <template v-if="areas.waves">
                  波：{{ areas.waves[index] }}<br>
                </template>
                <template v-if="areas.winds">
                  風：{{ areas.winds[index] }}<br>
                </template>
                
                最低気温：{{ timeTemps.areas[num].temps[0] }}度<br>
                最高気温：{{ timeTemps.areas[num].temps[1] }}度
                
                <table border=1 class="table">
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
            <template v-else-if="!$route.query.area_detail">
              <tr>
              <td>
                {{ areas.area.name }}<br>
                <img :src="require(`@/assets/img/`+WeatherCodes[areas.weatherCodes[index]][0])" /><br>
                天気：{{ areas.weathers[index] }}<br>
                <template v-if="areas.waves">
                  波：{{ areas.waves[index] }}<br>
                </template>
                <template v-if="areas.winds">
                  風：{{ areas.winds[index] }}<br>
                </template>
                
                最低気温：{{ timeTemps.areas[num].temps[0] }}度<br>
                最高気温：{{ timeTemps.areas[num].temps[1] }}度<br>
                降水確率：

                <table border=1 class="table">
                  <thead>
                    <tr>
                      <th>00-06</th>
                      <th>06-12</th>
                      <th>12-18</th>
                      <th>18-24</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <template v-for="(n,poptd) in 4">
                        <td>
                          <template v-for="(timeDef,defin) in timePops.timeDefines">
                            
                            <template v-if="dateNow[index][poptd] === timeDef">
                         
                              {{ timePops.areas[num].pops[defin] }}%<br>
                             
                            </template>
                            
                          </template>
                          
                          <template v-if="dateNow[index][poptd] < timeDefine">
                              -
                          </template>

                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </template>
            </template>
          </tbody>
          </template>
        </table>
        
        <h2>週間天気予報</h2>
        <table border=1 class="table">
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
                  天気：{{ WeatherCodes[weekArea.weatherCodes[index]][3] }}<br>
                  <img :src="require(`@/assets/img/`+WeatherCodes[weekArea.weatherCodes[index]][0])" />
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
        <table border=1 class="table">
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
        
        <!--
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
        -->
    </div>
</template>

<script>
import axios from 'axios'
import WeatherCodes from '@/assets/weatherCodes.json'

export default{
  head(){
    return {
      title: 'areaの天気予報',
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: 'areaの天気予報です'
        }
      ],
      link:[{
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
            integrity: 'sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1',
            crossorigin: 'anonymous'
      }],
    }
  },
  data(){
    return{
      //weathers: [],
      WeatherCodes: WeatherCodes,
      date:[],
    }
  },

  async fetch({store,params}){
    //console.log(params.area)
    //console.log(store)
    //this.weathers = await axios.get(this.url + this.area).then(res=>res.data)
    //paramsやcontextを取得する場合はstoreを使用する、その場合thisは使用できなくなる
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const area = params.area + '.json'
    await store.dispatch('forecast/forecast', {url, area}) //storeの場合actonsの引数と同じ名前を使用しないと受け渡せない
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
    },

  },

}

</script>

<style>
  .table{
    word-break: break-all;
  }
</style>