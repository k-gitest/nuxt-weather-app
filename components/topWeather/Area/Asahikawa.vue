<template>
  <div class="container">
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
            
            
          </tr>
        </template>
      </tbody>
    </table>
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
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const area = '012000'
    await this.$store.dispatch('forecast/forecast', {url, area})
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
  },
}

</script>


