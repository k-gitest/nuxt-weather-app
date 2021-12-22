<template>
  <div class="container">
    
    <template v-for="topWeather in topWeathers">
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
            <template v-for="week in topWeather.weekWeathers.timeDefines">
            <th>{{ week }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(weekArea,num) in topWeather.weekWeathers.areas">
            <tr>
              <td>{{ weekArea.area.name }}</td>
              <td>
                <img :src="require(`@/assets/img/`+WeatherCodes[topWeather.timeWeathers.areas[num].weatherCodes[0]][0])" /><br>
                <span class="text-primary">-</span>
                /
                <span class="text-danger">-</span>
              </td>
              
              <template v-for="(pop,index) in weekArea.pops">
              <td>
                <img :src="require(`@/assets/img/`+WeatherCodes[weekArea.weatherCodes[index]][0])" /><br>
                
                <template v-if="index === 0">
                  <span class="text-primary">{{ topWeather.timeTemps.areas[num].temps[0] }}</span>
                  /
                  <span class="text-danger">{{ topWeather.timeTemps.areas[num].temps[1] }}</span>
                </template>
                <template v-else>
                  <span class="text-primary">{{ topWeather.weekTemps.areas[num].tempsMin[index] }}</span>
                  /
                  <span class="text-danger">{{ topWeather.weekTemps.areas[num].tempsMax[index] }}</span>
                </template>
              </td>
              </template>

            </tr>
          </template>
        </tbody>
      </table>
    </template>

    
    <template v-for="topWeather in topWeathers">
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
            <template v-for="week in topWeather.weekWeathers.timeDefines">
            <th>{{ week }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(weekArea,num) in topWeather.weekWeathers.areas">
            <tr>
  
              <td>{{ weekArea.area.name }}</td>
              
              <td>
                
                天気：{{ WeatherCodes[topWeather.timeWeathers.areas[num].weatherCodes[0]][3]}}<br>
                <img :src="require(`@/assets/img/`+WeatherCodes[topWeather.timeWeathers.areas[num].weatherCodes[0]][0])" /><br>
                
                降水確率：
                <template v-for="(n,poptd) in 4">
                  <template v-for="(timeDef,defin) in topWeather.timePops.timeDefines">
                    <template v-if="dateNow[0][poptd] === timeDef">
                      {{ topWeather.timePops.areas[num].pops[defin] }}
                    </template>
                  </template>
                  
                  <template v-if="dateNow[0][poptd] < topWeather.timeWeathers.timeDefines[0]">-</template>
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
                <img :src="require(`@/assets/img/`+WeatherCodes[weekArea.weatherCodes[index]][0])" /><br>
                
                <template v-if="index === 0">
                  
                  <template v-for="(timeDefine,hoge) in topWeather.timeWeathers.timeDefines">
                    <template v-if="hoge === 1">
                      降水確率：
                      <template v-for="(n,poptd) in 4">
                        <template v-for="(timeDef,defin) in topWeather.timePops.timeDefines">
                          <template v-if="dateNow[hoge][poptd] === timeDef">
                            {{ topWeather.timePops.areas[num].pops[defin] }}
                          </template>
                        </template>
                        <template v-if="dateNow[hoge][poptd] < topWeather.timeWeathers.timeDefines[hoge]">-</template>
                        <template v-if="poptd < 3">
                          /
                        </template>
                      </template>
                      <br>
                      信頼度：-<br>
                      最低気温：{{ topWeather.timeTemps.areas[num].temps[0] }}度<br>
                      最高気温：{{ topWeather.timeTemps.areas[num].temps[1] }}度<br>
                    </template>
  
                  </template>
                </template>
                <template v-else>
                降水確率：{{ pop }}％<br>
                信頼度：
                <template v-if="weekArea.reliabilities[index]">{{weekArea.reliabilities[index]}}</template>
                <template v-else>-</template>
                <br>
                最高気温：{{ topWeather.weekTemps.areas[num].tempsMax[index] }}（{{ topWeather.weekTemps.areas[num].tempsMaxLower[index] }}～{{ topWeather.weekTemps.areas[num].tempsMaxUpper[index] }}）<br>
                最低気温：{{ topWeather.weekTemps.areas[num].tempsMin[index] }}（{{ topWeather.weekTemps.areas[num].tempsMinLower[index] }}～{{ topWeather.weekTemps.areas[num].tempsMinUpper[index] }}）
                </template>
              </td>
              </template>
              
              
            </tr>
          </template>
        </tbody>
      </table>
    </template>
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
    await this.$store.dispatch('forecast/forecastTop')
  },
  
  computed:{
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


