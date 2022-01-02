<template>
  <div class="container">
    <h1>全国の天気</h1>
    
    <div class="pb-1">
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
        <div class="content-item">
          <div class="map_item_wrap">
            
            <div class="map_item_inner">
              <button v-if="areaTab !== 0" class="btn btn-success area_map_all" @click="map_area(null,true); areaTab = 0">戻る</button>
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
          <!--
          <div class="area_top_map_wrap">
            <img src="@/assets/img/map_jp.svg" class="area_top_map" />
          </div>
          -->
          <div class="areaMapSVG_wrap">
            <div class="areaMapSVG" v-show="areaTab === 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                <g class="map_all">
                    <path display="inline" d="M261.561,0c-2.262,0-4.324,1.834-4.583,4.079l-6.417,55.63
                        c-0.26,2.247-0.561,4.082-0.672,4.082c-0.117,0-0.419,1.834-0.676,4.078l-0.78,6.776c-0.265,2.247,1.373,4.082,3.638,4.082h15.686
                        c2.256,0,4.314-1.835,4.574-4.082l0.391-3.335c0.256-2.25,2.318-4.082,4.58-4.082h61.281c2.259,0,4.32-1.843,4.577-4.09
                        l6.813-59.06C350.234,1.834,348.594,0,346.335,0H261.561z M92.832,287.885c-0.253,2.244,1.383,4.079,3.637,4.079h55.064
                        c2.261,0,4.324-1.835,4.583-4.079l3.842-33.325c0.259-2.241-1.379-4.082-3.642-4.082h-55.058c-2.26,0-4.322,1.841-4.582,4.082
                        L92.832,287.885z M285.885,91.896c-0.259,2.241-2.32,4.081-4.58,4.081h-29.469c-2.258,0-4.32,1.84-4.58,4.082l-8.75,75.862
                        c-0.259,2.247-2.32,4.093-4.586,4.093h-14.275c-2.262,0-3.898-1.846-3.637-4.093l0.826-7.204c0.262-2.25-1.379-4.084-3.641-4.084
                        h-11.197c-2.264,0-4.32,1.834-4.582,4.084l-0.832,7.204c-0.256,2.247-2.321,4.093-4.583,4.093h-82.944
                        c-2.26,0-4.301,1.834-4.535,4.084l-4.897,46.821c-0.233,2.25,1.424,4.09,3.69,4.09h68.831c2.262,0,3.862,1.834,3.561,4.07
                        l-2.823,20.772c-0.305,2.236,1.296,4.073,3.554,4.073h33.117c2.26,0,4.324-1.843,4.578-4.084l1.896-16.427
                        c0.26-2.247,2.321-4.084,4.583-4.084h54.616c2.259,0,3.899,1.837,3.641,4.084l-0.955,8.269c-0.262,2.245,1.383,4.079,3.639,4.079
                        h11.201c2.256,0,4.321-1.834,4.58-4.079l18.965-164.391c0.26-2.241-1.379-4.075-3.641-4.075h-21.658
                        c-2.259,0-4.324,1.834-4.58,4.075L285.885,91.896z M7.313,226.287c-0.256,2.244,1.38,4.079,3.643,4.079h18.669
                        c2.257,0,3.894,1.843,3.64,4.084L27.1,287.885c-0.258,2.244,1.376,4.079,3.639,4.079h42.572c2.263,0,4.32-1.835,4.582-4.079
                        l12.023-104.229c0.263-2.241-1.376-4.081-3.64-4.081H16.812c-2.263,0-4.322,1.84-4.582,4.081L7.313,226.287z M0.027,289.443
                        c-0.259,2.25,1.377,4.087,3.637,4.087h11.203c2.264,0,4.322-1.837,4.583-4.087l3.365-29.179c0.259-2.244-1.38-4.084-3.637-4.084
                        h-11.2c-2.266,0-4.322,1.84-4.586,4.084L0.027,289.443z" />
                </g>
                <a xlink:href="#" @click="map_area(centers['010200'].children);areaTab = 1">
                  <g class="hokkaido">
                      <path 
                          d="M261.561 0c-2.262 0-4.324 1.834-4.583 4.079l-6.417 55.63c-.26 2.247-.561 4.082-.672 4.082-.117 0-.419 1.834-.676 4.078l-.78 6.776c-.265 2.247 1.373 4.082 3.638 4.082h15.686c2.256 0 4.314-1.835 4.574-4.082l.391-3.335c.256-2.25 2.318-4.082 4.58-4.082h61.281c2.259 0 4.32-1.843 4.577-4.09l6.813-59.06C350.234 1.834 348.594 0 346.335 0h-84.774z" />
                  </g>
                </a>
                <a xlink:href="#">
                  <g class="shikoku" @click="map_area(centers['010800'].children);areaTab = 7">
                      <path 
                          d="M92.832 287.885c-.253 2.244 1.383 4.079 3.637 4.079h55.064c2.261 0 4.324-1.835 4.583-4.079l3.842-33.325c.259-2.241-1.379-4.082-3.642-4.082h-55.058c-2.26 0-4.322 1.841-4.582 4.082l-3.844 33.325z" />
                  </g>
                </a>
                <a xlink:href="#">
                  <g class="kyusyu" @click="map_area(centers['010900'].children);areaTab = 8">
                      <path 
                          d="M7.313 226.287c-.256 2.244 1.38 4.079 3.643 4.079h18.669c2.257 0 3.894 1.843 3.64 4.084L27.1 287.885c-.258 2.244 1.376 4.079 3.639 4.079h42.572c2.263 0 4.32-1.835 4.582-4.079l12.023-104.229c.263-2.241-1.376-4.081-3.64-4.081H16.812c-2.263 0-4.322 1.84-4.582 4.081l-4.917 42.631z" />
                  </g>
                </a>
                <a xlink:href="#">
                  <g class="okinawa" @click="map_area(centers['011100'].children);areaTab = 9">
                      <path
                          d="M.027 289.443c-.259 2.25 1.377 4.087 3.637 4.087h11.203c2.264 0 4.322-1.837 4.583-4.087l3.365-29.179c.259-2.244-1.38-4.084-3.637-4.084h-11.2c-2.266 0-4.322 1.84-4.586 4.084L.027 289.443z" />
                  </g>
                </a>
                <a xlink:href="#">
                  <g class="chugoku" @click="map_area(centers['010700'].children);areaTab = 6">
                      <path
                          d="m104.52 184.098-4.897 46.821c-.233 2.25 1.424 4.09 3.69 4.09h46.245l5.445-54.995h-45.948c-2.261 0-4.301 1.834-4.535 4.084z" />
                  </g>
                </a>
                <a xlink:href="#">
                  <g class="kansai" @click="map_area(centers['010600'].children);areaTab = 5">
                      <path
                          d="m215.229 250.332-27.045-70.318h-33.181l-5.445 54.995h22.586c2.262 0 3.862 1.834 3.561 4.07l-2.823 20.772c-.305 2.236 1.296 4.073 3.554 4.073h33.117c2.26 0 4.324-1.843 4.578-4.084" />
                  </g>
                </a>
                <a xlink:href="#" @click="map_area(centers['010400'].children);areaTab = 4">
                  <g class="tokai">
                      <path
                          d="M219.645 180.014c-2.262 0-3.898-1.846-3.637-4.093l.826-7.204c.262-2.25-1.379-4.084-3.641-4.084h-11.197c-2.264 0-4.32 1.834-4.582 4.084l-.832 7.204c-.256 2.247-2.321 4.093-4.583 4.093h-3.815l27.045 70.318.799-6.918c.26-2.247 2.321-4.084 4.583-4.084h35.08l-23.522-59.316h-12.524z" />
                  </g>
                </a>
                <a xlink:href="#" @click="map_area(centers['010300'].children);areaTab = 3">
                  <g class="kanto">
                      <path
                          d="M306.414 172.954h-67.566l-.342 2.967c-.259 2.247-2.32 4.093-4.586 4.093h-1.752l23.522 59.316h19.536c2.259 0 3.899 1.837 3.641 4.084l-.955 8.269c-.262 2.245 1.383 4.079 3.639 4.079h11.201c2.256 0 4.321-1.834 4.58-4.079" />
                  </g>
                </a>
                <a xlink:href="#" @click="map_area(centers['010200'].children);areaTab = 2">
                  <g class="tohoku">
                      <path
                          d="M312.656 83.217h-21.658c-2.259 0-4.324 1.834-4.58 4.075l-.533 4.604c-.259 2.241-2.32 4.081-4.58 4.081h-29.469c-2.258 0-4.32 1.84-4.58 4.082l-8.408 72.896h67.566l9.883-85.662c.26-2.242-1.379-4.076-3.641-4.076z" />
                  </g>
                </a>
              </svg>
            </div>
            
            <div class="areaMapSVG" v-show="areaTab === 1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#" @click="map_area(centers['010200'].children)">
                  <g class="hokkaido">
                      <path 
                          d="M261.561 0c-2.262 0-4.324 1.834-4.583 4.079l-6.417 55.63c-.26 2.247-.561 4.082-.672 4.082-.117 0-.419 1.834-.676 4.078l-.78 6.776c-.265 2.247 1.373 4.082 3.638 4.082h15.686c2.256 0 4.314-1.835 4.574-4.082l.391-3.335c.256-2.25 2.318-4.082 4.58-4.082h61.281c2.259 0 4.32-1.843 4.577-4.09l6.813-59.06C350.234 1.834 348.594 0 346.335 0h-84.774z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#" @click="map_area(centers['010200'].children)">
                  <g class="tohoku">
                      <path
                          d="M312.656 83.217h-21.658c-2.259 0-4.324 1.834-4.58 4.075l-.533 4.604c-.259 2.241-2.32 4.081-4.58 4.081h-29.469c-2.258 0-4.32 1.84-4.58 4.082l-8.408 72.896h67.566l9.883-85.662c.26-2.242-1.379-4.076-3.641-4.076z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#" @click="map_area(centers['010300'].children)">
                  <g class="kanto">
                      <path
                          d="M306.414 172.954h-67.566l-.342 2.967c-.259 2.247-2.32 4.093-4.586 4.093h-1.752l23.522 59.316h19.536c2.259 0 3.899 1.837 3.641 4.084l-.955 8.269c-.262 2.245 1.383 4.079 3.639 4.079h11.201c2.256 0 4.321-1.834 4.58-4.079" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#" @click="map_area(centers['010400'].children);areaTab = 4">
                  <g class="tokai">
                      <path
                          d="M219.645 180.014c-2.262 0-3.898-1.846-3.637-4.093l.826-7.204c.262-2.25-1.379-4.084-3.641-4.084h-11.197c-2.264 0-4.32 1.834-4.582 4.084l-.832 7.204c-.256 2.247-2.321 4.093-4.583 4.093h-3.815l27.045 70.318.799-6.918c.26-2.247 2.321-4.084 4.583-4.084h35.08l-23.522-59.316h-12.524z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#">
                  <g class="kansai" @click="map_area(centers['010600'].children)">
                      <path
                          d="m215.229 250.332-27.045-70.318h-33.181l-5.445 54.995h22.586c2.262 0 3.862 1.834 3.561 4.07l-2.823 20.772c-.305 2.236 1.296 4.073 3.554 4.073h33.117c2.26 0 4.324-1.843 4.578-4.084" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#">
                  <g class="chugoku" @click="map_area(centers['010700'].children);areaTab = 6">
                      <path
                          d="m104.52 184.098-4.897 46.821c-.233 2.25 1.424 4.09 3.69 4.09h46.245l5.445-54.995h-45.948c-2.261 0-4.301 1.834-4.535 4.084z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#">
                  <g class="shikoku" @click="map_area(centers['010800'].children);areaTab = 7">
                      <path 
                          d="M92.832 287.885c-.253 2.244 1.383 4.079 3.637 4.079h55.064c2.261 0 4.324-1.835 4.583-4.079l3.842-33.325c.259-2.241-1.379-4.082-3.642-4.082h-55.058c-2.26 0-4.322 1.841-4.582 4.082l-3.844 33.325z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#">
                  <g class="kyusyu" @click="map_area(centers['010900'].children);areaTab = 8">
                      <path 
                          d="M7.313 226.287c-.256 2.244 1.38 4.079 3.643 4.079h18.669c2.257 0 3.894 1.843 3.64 4.084L27.1 287.885c-.258 2.244 1.376 4.079 3.639 4.079h42.572c2.263 0 4.32-1.835 4.582-4.079l12.023-104.229c.263-2.241-1.376-4.081-3.64-4.081H16.812c-2.263 0-4.322 1.84-4.582 4.081l-4.917 42.631z" />
                  </g>
                </a>
              </svg>
            </div>
            <div class="areaMapSVG" v-show="areaTab === 9">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 293.53" overflow="visible">
                
                <a xlink:href="#">
                  <g class="okinawa" @click="map_area(centers['011100'].children);areaTab = 9">
                      <path
                          d="M.027 289.443c-.259 2.25 1.377 4.087 3.637 4.087h11.203c2.264 0 4.322-1.837 4.583-4.087l3.365-29.179c.259-2.244-1.38-4.084-3.637-4.084h-11.2c-2.266 0-4.322 1.84-4.586 4.084L.027 289.443z" />
                  </g>
                </a>
              </svg>
            </div>
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
      areaTab:0,
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
    //await this.$store.dispatch('forecast/forecastAll')
    await this.$store.dispatch('forecast/forecastIndex')
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
    centers: function(){
      return this.$store.getters['forecast/centers']
    },
  },
  
  methods: {
    map_area: function(mapArea){
        this.$store.dispatch('forecast/forecastAll', {mapArea})
    },
    
  },
}

</script>


