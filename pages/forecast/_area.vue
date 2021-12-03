<template>
    <div class="container">
      <template>
        <nuxt-link to="/about">天気トップページ</nuxt-link>
      </template>
      <template v-if="$route.params.area">
        
        {{ offices[$route.params.area] }}
        
      </template>
      {{ area_details }}
      <template v-if="$route.query.area_detail">
        {{ $route.query.area_detail }}
        {{ $route.query.area_detail }}
      </template>

      
      <template v-for="(recent,index) in recentTime">
        <table>
          <thead>
            <tr>
              <th>{{ recent }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <template v-for="(areas, num) in timeWeathers.areas">
                  <h3 class="h5">{{ areas.area.name }}</h3>
                  
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
                  
                  <template v-if="index < 2">
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
                            
                            <template v-if="dateNow[index][poptd] < timeWeathers.timeDefines[index]">
                                -
                            </template>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                  </template>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
        
      
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

                    <template v-if="index < 2">
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
                    </template>
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
              <template v-for="(time,timenum) in timeNow">
                <template v-if="timenum < 1">
                <th>
                  {{ time }}
                </th>
                </template>
              </template>
              <template v-for="week in weekWeathers.timeDefines">
              <th>{{ week }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(weekArea,num) in weekWeathers.areas">
              <tr>
                <template v-if="$route.query.area_detail && $route.query.area_detail === weekArea.area.code">
                <td>{{ weekArea.area.name }}</td>
                
                <td>
                  
                  天気：{{ WeatherCodes[timeWeathers.areas[num].weatherCodes[0]][3]}}<br>
                  <img :src="require(`@/assets/img/`+WeatherCodes[timeWeathers.areas[num].weatherCodes[0]][0])" />
                  
                  降水確率：
                  <template v-for="(n,poptd) in 4">
                    <template v-for="(timeDef,defin) in timePops.timeDefines">
                      <template v-if="dateNow[0][poptd] === timeDef">
                        {{ timePops.areas[num].pops[defin] }}
                      </template>
                    </template>
                    
                    <template v-if="dateNow[0][poptd] < timeWeathers.timeDefines[0]">-</template>
                    <template v-if="poptd < 3">
                      /
                    </template>
                  </template>
                  <br>
                  信頼度：-<br>
                  最高気温：-<br>
                  最低気温：-<br>
                </td>
                
                <template v-for="(pop,index) in weekArea.pops">
                <td>
                  天気：{{ WeatherCodes[weekArea.weatherCodes[index]][3] }}<br>
                  <img :src="require(`@/assets/img/`+WeatherCodes[weekArea.weatherCodes[index]][0])" />
                  
                  <template v-if="index === 0">
                    
                    <template v-for="(timeDefine,hoge) in timeWeathers.timeDefines">
                      <template v-if="hoge === 1">
                        降水確率：
                        <template v-for="(n,poptd) in 4">
                          <template v-for="(timeDef,defin) in timePops.timeDefines">
                            <template v-if="dateNow[hoge][poptd] === timeDef">
                              {{ timePops.areas[num].pops[defin] }}
                            </template>
                          </template>
                          <template v-if="dateNow[hoge][poptd] < timeWeathers.timeDefines[hoge]">-</template>
                          <template v-if="poptd < 3">
                            /
                          </template>
                        </template>
                        <br>
                        信頼度：-<br>
                        最低気温：{{ timeTemps.areas[num].temps[0] }}度<br>
                        最高気温：{{ timeTemps.areas[num].temps[1] }}度<br>
                      </template>
  
                    </template>
                  </template>
                  <template v-else>
                  降水確率：{{ pop }}％<br>
                  信頼度：
                  <template v-if="weekArea.reliabilities[index]">{{weekArea.reliabilities[index]}}</template>
                  <template v-else>-</template>
                  <br>
                  最高気温：{{ weekTemps.areas[num].tempsMax[index] }}（{{ weekTemps.areas[num].tempsMaxLower[index] }}～{{ weekTemps.areas[num].tempsMaxUpper[index] }}）<br>
                  最低気温：{{ weekTemps.areas[num].tempsMin[index] }}（{{ weekTemps.areas[num].tempsMinLower[index] }}～{{ weekTemps.areas[num].tempsMinUpper[index] }}）
                  </template>
                </td>
                </template>
                </template>
                
                
                <template v-if="!$route.query.area_detail">
                <td>{{ weekArea.area.name }}</td>
                
                <td>
                  
                  天気：{{ WeatherCodes[timeWeathers.areas[num].weatherCodes[0]][3]}}<br>
                  <img :src="require(`@/assets/img/`+WeatherCodes[timeWeathers.areas[num].weatherCodes[0]][0])" />
                  
                  降水確率：
                  <template v-for="(n,poptd) in 4">
                    <template v-for="(timeDef,defin) in timePops.timeDefines">
                      <template v-if="dateNow[0][poptd] === timeDef">
                        {{ timePops.areas[num].pops[defin] }}
                      </template>
                    </template>
                    
                    <template v-if="dateNow[0][poptd] < timeWeathers.timeDefines[0]">-</template>
                    <template v-if="poptd < 3">
                      /
                    </template>
                  </template>
                  <br>
                  信頼度：-<br>
                  最高気温：-<br>
                  最低気温：-<br>
                </td>
                
                <template v-for="(pop,index) in weekArea.pops">
                <td>
                  天気：{{ WeatherCodes[weekArea.weatherCodes[index]][3] }}<br>
                  <img :src="require(`@/assets/img/`+WeatherCodes[weekArea.weatherCodes[index]][0])" />
                  
                  <template v-if="index === 0">
                    
                    <template v-for="(timeDefine,hoge) in timeWeathers.timeDefines">
                      <template v-if="hoge === 1">
                        降水確率：
                        <template v-for="(n,poptd) in 4">
                          <template v-for="(timeDef,defin) in timePops.timeDefines">
                            <template v-if="dateNow[hoge][poptd] === timeDef">
                              {{ timePops.areas[num].pops[defin] }}
                            </template>
                          </template>
                          <template v-if="dateNow[hoge][poptd] < timeWeathers.timeDefines[hoge]">-</template>
                          <template v-if="poptd < 3">
                            /
                          </template>
                        </template>
                        <br>
                        信頼度：-<br>
                        最低気温：{{ timeTemps.areas[num].temps[0] }}度<br>
                        最高気温：{{ timeTemps.areas[num].temps[1] }}度<br>
                      </template>
  
                    </template>
                  </template>
                  <template v-else>
                  降水確率：{{ pop }}％<br>
                  信頼度：
                  <template v-if="weekArea.reliabilities[index]">{{weekArea.reliabilities[index]}}</template>
                  <template v-else>-</template>
                  <br>
                  最高気温：{{ weekTemps.areas[num].tempsMax[index] }}（{{ weekTemps.areas[num].tempsMaxLower[index] }}～{{ weekTemps.areas[num].tempsMaxUpper[index] }}）<br>
                  最低気温：{{ weekTemps.areas[num].tempsMin[index] }}（{{ weekTemps.areas[num].tempsMinLower[index] }}～{{ weekTemps.areas[num].tempsMinUpper[index] }}）
                  </template>
                </td>
                </template>
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
        
        <h2>{{ overview.targetArea }}の天気概況</h2>
        <ul>
          <li>{{ overview.publishingOffice }}：{{ overview.reportDatetime }}発表</li>
          <li>{{ overview.headlineText }}</li>
          <li>{{ overview.text }}</li>
        </ul>
    </div>
</template>

<script>
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
      WeatherCodes: WeatherCodes,
    }
  },

  async fetch({store,params,query}){
    //console.log(params.area)
    //console.log(query.area_detail)
    //this.weathers = await axios.get(this.url + this.area).then(res=>res.data)
    //paramsやcontextを取得する場合はstoreを使用する、その場合thisは使用できなくなる
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const url_overview = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/'
    const area = params.area
    const area_detail = query.area_detail
    await store.dispatch('forecast/forecast', {url, area, area_detail}) //storeの場合actonsの引数と同じ名前を使用しないと受け渡せない
    await store.dispatch('forecast/forecastOverview', {url_overview, area})
    await store.dispatch('forecast/forecastIndex')
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