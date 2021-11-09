<template>
    <div>
        <h1>About Page</h1>
        <h2>{{ subtitle }}</h2>
        
        <div>
            <table border=1>
                <thead>
                    <tr>
                    <template v-for="timeDefine in timeWeathers.timeDefines">
                        <th>{{ timeDefine }}</th>
                    </template>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="area in timeWeathers.areas">
                        <tr>
                        <td>{{ area.area.name }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        
        <ul v-for="(item, no) in items">
            <li>{{ item.publishingOffice }}</li>
            <li>{{ item.reportDatetime }}の発表</li>
            <h2 v-if="no === 0">直近の天気予報</h2>
            <h2 v-if="no === 1">週間予報</h2>
            <template v-for="(time, n) in item.timeSeries">
                <h2 v-if="n === 0 && no === 0">直近3日間の天気予報</h2>
                <h2 v-if="n === 1 && no === 0">直近6時間毎の降水確率</h2>
                <h2 v-if="n === 2 && no === 0">今日・明日の朝の最低気温と日中の最高気温</h2>
                <li v-for="(timeItem, index) in time.timeDefines">
                    <template v-for="areaWeather in time.areas">
                        {{ areaWeather.area.name }}：{{ timeItem }}：{{ index }}<br>
                        <template v-for="(weather, num) in areaWeather.weathers">
                            <template v-if="(num === index)">
                                天気：{{ weather }}<br>
                            </template>
                        </template>
                        <template v-for="(wind, num) in areaWeather.winds">
                            <template v-if="(num === index)">
                                風向き：{{ wind }}<br>
                            </template>
                        </template>
                        <template v-for="(wave, num) in areaWeather.waves">
                            <template v-if="(num === index)">
                                波の高さ：{{ wave }}<br>
                            </template>
                        </template>
                        <template v-for="(pop, num) in areaWeather.pops">
                            <template v-if="(num === index)">
                                降水確率：{{ pop }}％<br>
                            </template>
                        </template>
                        <template v-for="(temp, num) in areaWeather.temps">
                            <template v-if="(num === index && num === 0)">
                                朝の最低気温：{{ temp }}度<br>
                            </template>
                            <template v-if="(num === index && num === 1)">
                                日中の最高気温：{{ temp }}度<br>
                            </template>
                        </template>
                        <template v-for="(tempMin, num) in areaWeather.tempsMin">
                            <template v-if="(num === index)">
                                最低気温：{{ tempMin }}度<br>
                            </template>
                        </template>
                        <template v-for="(tempMax, num) in areaWeather.tempsMax">
                            <template v-if="(num === index)">
                                最低気温：{{ tempMax }}度<br>
                            </template>
                        </template>
                    </template>
                </li>
            </template>
        </ul>

        <ul>
            <li v-for="weather in weathers">{{ weather }}</li>
        </ul>
        <button @click="are_write(`overview_forecast/130000.json`)">東京</button>
        <button @click="are_write(`overview_forecast/140000.json`)">横浜</button>

    </div>
</template>

<script>
import axios from 'axios'

export default{
  layout: 'original',
  data(){
      return{
          subtitle: 'この文書はNuxt.jsでの気象庁のデータについて説明しています。',
          weathers: [],
          url: 'https://www.jma.go.jp/bosai/forecast/data/',
          area: 'overview_forecast/130000.json'
      }
  },

  // asyncDataではthisは不可、propsは可能
  async asyncData(){
      const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json'
      
      return await axios.get(url)
      .then(res => {
          const items = res.data
          const timeSeries = res.data[0].timeSeries //直近予報
          const weekSeries = res.data[1].timeSeries //週間予報
          
          const timeWeathers = res.data[0].timeSeries[0] //3日間の天気予報
          const timePops   = res.data[0].timeSeries[1] //6時間毎の降水確率
          const timeTemps = res.data[0].timeSeries[2] //朝の最低気温と日中の最高気温
          
          console.log(timeSeries)
          console.log(weekSeries)
          
          //console.log(res.data)
          return {items, timeSeries, weekSeries, timeWeathers, timePops, timeTemps}
          })
          
  },
  
  // fetchではthisが可能
  async fetch(){
      //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
      this.weathers = await fetch(this.url + this.area).then(res => res.json())
  },
  methods: {
      are_write: async function(area){
          this.area = area
          this.weathers = await fetch(this.url + this.area).then(res => res.json())
      },
  },
  
  // headプロパティでtitleやmetaなどを設定できる
  head(){
      return{
          title: 'Aboutのページ',
          meta:[
              {
                  hid: 'description',
                  name: 'description',
                  content: 'Aboutページ説明です'
              }
              ]
      }
  },
  
  

  
}
</script>