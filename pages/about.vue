<template>

    <div v-cloak>
      <h1>About Page</h1>
      <h2>{{ subtitle }}</h2>
      
      <!--
      <div class="container">
        <h2>{{ items[0].publishingOffice }} {{ items[0].reportDatetime }}発表</h2>
        <table border=1 class="table">
          <template v-for="(timeDefine, index) in timeWeathers.timeDefines">
          <thead>
            <tr>
              <th>{{ timeDefine }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(area, num) in timeWeathers.areas">
              <tr>
                <td>
                {{ area.area.name }}<br>
                天気：{{ area.weathers[index] }}<br>
                風向き：{{ area.winds[index] }}<br>
                波の高さ：{{ area.waves[index] }}<br>
                平均最低気温：{{ timeTemps.areas[num].temps[0] }}<br>
                平均最高気温：{{ timeTemps.areas[num].temps[1] }}
                  <table border=1 class="table">
                    <thead>
                      <tr>
                        <template v-for="timepop in timePops.timeDefines">
                        <th>{{ timepop }}</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <template v-for="area in timePops.areas[num].pops">
                        <td>降水確率：{{ area }}％</td>
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
      </div>
      
      <div class="container">
        <h2>週間天気</h2>
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
      </div>
      
      <div class="container">
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
      </div>
      
      -->

        <!--
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
        -->
    <TopForecast />
    <Centers />
    <!--
    <Weather />
    -->

    </div>
</template>

<script>
import axios from 'axios'

export default{
  layout: 'original',
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
      ],
      link:[
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
            integrity: 'sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1',
            crossorigin: 'anonymous'
        }
      ],
    }
  },
  data(){
      return{
          subtitle: 'この文書はNuxt.jsでの気象庁のデータについて説明しています。',
      }
  },

  // asyncDataではthisは不可、propsは可能
  async asyncData(){
      const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json'
      
      return await axios.get(url)
      .then(res => {
        /*
          const items = res.data
          const timeSeries = res.data[0].timeSeries //直近予報
          const weekSeries = res.data[1].timeSeries //週間予報
          const tempAverage = res.data[1].tempAverage.areas //一週間の最低、最高気温の平年値
          const precipAverage = res.data[1].precipAverage.areas //降水量の一週間（明日から７日先まで）合計の平年値
        
          //console.log(tempAverage[0].area)
        
          const timeWeathers = timeSeries[0] //3日間の天気予報
          const timePops   = res.data[0].timeSeries[1] //6時間毎の降水確率
          const timeTemps = res.data[0].timeSeries[2] //朝の最低気温と日中の最高気温
          
          const weekWeathers = weekSeries[0] //週間予報（天気、降水確率、信頼度）
          const weekTemps = weekSeries[1] //週間気温予報（最気温、最低気温の予測下限、上限、最高気温、最高気温の予測下限、上限）

          
          tempsMin:最低気温
          tempsMinUpper:最低気温上限
          tempsMinLower:最低気温下限
          tempsMax:最高気温
          tempsMaxUpper:最高気温上限
          tempsMaxLower:最高気温下限
          */

          /*日付時刻フォーマット変換処理
          //foreach、filter、mapのどれでも取得変換できる
          timeSeries.forEach(e=>{
              //console.log(e.timeDefines)
              e.timeDefines = e.timeDefines.map(e=>{
              const date = new Date(e) // 文字列フォーマットYYYY-MM-DDTHH:mm:ss.sssZをDateオブジェクトで変換、"T" の文字はデリミタ、'Z'はフォーマット+-hh:mmのタイムゾーンを示す、Dateオブジェクトは1970年1月1日0時0分0秒から経過したミリ秒を出力する
              const y = date.getFullYear()
              const m = date.getMonth()+1 //月は０始まりなので＋１をする
              const d = date.getDate()
              const day = '日月火水木金土'.charAt(date.getDay()) //getdayの返り値は数字なのでcharAtで文字列に当てはめ表示する
              const hh = date.getHours()
              const mm = date.getMinutes()
              return `${y}年${m}月${d}日（${day}）${hh}時${mm}分` //フォーマットを作成する
              //console.log(`${y}年${m}月${d}日（${day}）${hh}時${mm}分`)
              })
          })
          */
          /*
          items.filter((f) =>{
              if(f.reportDatetime){
                  const date = new Date(f.reportDatetime)
                  const y = date.getFullYear()
                  const m = date.getMonth()+1
                  const d = date.getDate()
                  const day = '日月火水木金土'.charAt(date.getDay())
                  const hh = date.getHours()
                  const mm = date.getMinutes()
                  f.reportDatetime = `${y}年${m}月${d}日（${day}）${hh}時${mm}分`
              }
          })
          
          timeSeries.filter(f=>{
              f.timeDefines = f.timeDefines.map(e=>{
              const date = new Date(e)
              const y = date.getFullYear()
              const m = date.getMonth()+1
              const d = date.getDate()
              const day = '日月火水木金土'.charAt(date.getDay())
              const hh = date.getHours()
              const mm = date.getMinutes()
              return `${y}年${m}月${d}日（${day}）${hh}時${mm}分`
              //console.log(`${y}年${m}月${d}日（${day}）${hh}時${mm}分`)
              })
          })

          weekSeries.filter(f=>{
              f.timeDefines = f.timeDefines.map(e=>{
              const date = new Date(e)
              const y = date.getFullYear()
              const m = date.getMonth()+1
              const d = date.getDate()
              const day = '日月火水木金土'.charAt(date.getDay())
              const hh = date.getHours()
              const mm = date.getMinutes()
              return `${y}年${m}月${d}日（${day}）${hh}時${mm}分`
              //console.log(`${y}年${m}月${d}日（${day}）${hh}時${mm}分`)
              })
              //console.log(f)
          })
          
          return {items, timeSeries, weekSeries, timeWeathers, timePops, timeTemps, weekWeathers, weekTemps, tempAverage, precipAverage}
          */
      })
          
  },
  
}
</script>
<style>
    [v-cloak] {
      display: none;
    }
</style>