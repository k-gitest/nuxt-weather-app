<template>
  <div class="container">
    <h1>全国の天気</h1>
    <div>
      <ul class="nav_top_tab">
        
        <template v-for="(time,timenum) in timeNow">
          <template v-if="timenum < 1">
            <li :class="{ clickBtn: day === 0 }" @click="day = 0">{{ time }}</li>
          </template>
        </template>
        
        <template v-for="(weekTime,index) in weekTimes[0]">
          <li :class="{ clickBtn: day === index+1 }" @click="day = index+1">{{ weekTime }}</li>
        </template>

      </ul>
      
      <div class="nav_top_content">
        <div v-show="tab === 0" class="content-item">
          
          <div class="map_item_wrap">
            <div class="map_item_inner">
              <template v-for="(weekArea,num) in topWeathers">
                <nuxt-link :to="`./forecast/${weekArea.id}`">
                  <div class="nav_top_map" :style="`top:` + topArea[num].top + `;left:` + topArea[num].left + `;`">
                    <p>{{topWeathers[num].weekWeathers.areas[0].area.name}}</p>
                    <template v-if="day === 0">
                      <img :src="require(`@/assets/img/`+WeatherCodes[topWeathers[num].timeWeathers.areas[0].weatherCodes[0]][0])" /><br>
                      <ul class="temp">
                        <li><span class="text-primary">-</span></li>
                        <li><span class="text-danger">-</span></li>
                      </ul>
                    </template>
                    <template v-if="day !== 0">
                      <img :src="require(`@/assets/img/`+WeatherCodes[topWeathers[num].weekWeathers.areas[0].weatherCodes[day-1]][0])" /><br>
                      
                      <template v-if="day === 1">
                        <ul class="temp">
                          <li><span class="text-primary">{{ topWeathers[num].timeTemps.areas[0].temps[0] }}</span></li>
                          <li><span class="text-danger">{{ topWeathers[num].timeTemps.areas[0].temps[1] }}</span></li>
                        </ul>
                      </template>
                      <template v-else>
                        <ul class="temp">
                          <li><span class="text-primary">{{ topWeathers[num].weekTemps.areas[0].tempsMin[day-1] }}</span></li>
                          <li><span class="text-danger">{{ topWeathers[num].weekTemps.areas[0].tempsMax[day-1] }}</span></li>
                        </ul>
                      </template>
                      
                    </template>
                  </div>
                </nuxt-link>
              </template>
            </div>
          </div>
          <div class="area_top_map_wrap">
            <img src="@/assets/img/map_jp.svg" class="area_top_map" />
          </div>
        </div>
      </div>
    </div>
    
    <!--
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
    -->
    <!--
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
      tab:0,
      day:0,
      topArea:[
          //釧路
          {
            top: "5%",
            left: "85%",
          },
          //旭川
          /*
          {
            top:"10%",
            left:"70%",
          },
          */
          //札幌
          {
            top:"2%",
            left:"65%",
          },
          //青森
          {
            top:"25%",
            left:"75%",
          },
          //秋田
          {
            top:"20%",
            left:"60%",
          },
          //仙台
          {
            top:"45%",
            left:"75%",
          },
          //新潟
          {
            top:"40%",
            left:"57%",
          },
          //金沢
          {
            top:"40%",
            left:"43%",
          },
          //東京
          {
            top:"65%",
            left:"75%",
          },
          //宇都宮
          /*
          {
            top:"60%",
            left:"80%",
          },
          */
          //長野
          {
            top:"60%",
            left:"60%",
          },
          //名古屋
          {
            top:"80%",
            left:"57%",
          },
          //大阪
          {
            top:"75%",
            left:"43%",
          },
          //高松
          /*
          {
            top:"80%",
            left:"45%",
          },
          */
          //松江
          {
            top:"30%",
            left:"29%",
          },
          //広島
          {
            top:"50%",
            left:"29%",
          },
          //高知
          {
            top:"80%",
            left:"30%",
          },
          //福岡
          {
            top:"50%",
            left:"14%",
          },
          //鹿児島
          {
            top:"80%",
            left:"15%",
          },
          //那覇
          {
            top:"80%",
            left:"0%",
          },
          //石垣
          /*
          {
            top:"70%",
            left:"0%",
          },
          */
        ],
    }
  },
  
  async fetch(){
    await this.$store.dispatch('forecast/forecastTop')
    await this.$store.dispatch('forecast/forecastAll')
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
    },
    weekTimes: function(){
      return this.$store.getters['forecast/weekTime']
    },
  },
}

</script>


