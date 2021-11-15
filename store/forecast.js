import axios from 'axios'

export const state = () => ({
    forecasts: [], //全データ
    timeSeries: [], //直近予報
    weekSeries: [], //週間予報
    tempAverage: [], //一週間の最低、最高気温の平年値
    precipAverage: [], // 降水量の一週間（明日から７日先まで）合計の平年値
    timeWeathers: [], //3日間の天気予報
    timePops: [], //6時間毎の降水確率
    timeTemps: [], //朝の最低気温と日中の最高気温
    weekWeathers: [], //週間予報（天気、降水確率、信頼度）
    weekTemps: [], //週間気温予報（最気温、最低気温の予測下限、上限、最高気温、最高気温の予測下限、上限）
    url: '',
    area: ''
})

export const getters = {
  forecasts: function(state){
      
      return state.forecasts.filter(f=>{
          console.log(f.reportDatetime)
              if(f.reportDatetime){
              const date = new Date(f.reportDatetime)
              const y = date.getFullYear()
              const m = date.getMonth()+1
              const d = date.getDate()
              const day = '日月火水木金土'.charAt(date.getDay())
              const hh = date.getHours()
              const mm = date.getMinutes()
              return `${y}年${m}月${d}日（${day}）${hh}時${mm}分`
              //console.log(`${y}年${m}月${d}日（${day}）${hh}時${mm}分`)
              }
          })
      
      //return state.forecasts
  },
}

export const mutations = {
    setForecast: function(state, {param}){
        //console.log(param.timeWeathers)
        state.forecasts = param.items
        
        state.timeSeries = param.timeSeries
        state.timeWeathers = param.timeWeathers
        state.timePops = param.timePops
        state.timeTemps = param.timeTemps
        
        state.weekSeries = param.weekSeries
        state.tempAverage = param.tempAverage
        state.precipAverage = param.precipAverage
    },
}

export const actions = {
    forecast: async function({commit},{url, area}){
        console.log(commit)
        //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
        //const area = 'overview_forecast/130000.json'
        return await axios.get(url + area)
        .then(res => {
            //console.log(res.data[0].timeSeries)
            if(area.includes('overview')){
                const param = {
                    items: res.data,
                }
                commit('setForecast', {param})
            }else{
                const param = {
                    items:res.data,
                    
                    timeSeries: res.data[0].timeSeries,
                    timeWeathers: res.data[0].timeSeries[0],
                    timePops: res.data[0].timeSeries[1],
                    timeTemps: res.data[0].timeSeries[2],
                    
                    weekSeries: res.data[1].timeSeries,
                    weekWeathers: res.data[1].timeSeries[0],
                    weekTemps: res.data[1].timeSeries[1]
                }
                commit('setForecast', {param})
            }
            //console.log(param)
            //commit('setForecast', {param})
        })
    }
}