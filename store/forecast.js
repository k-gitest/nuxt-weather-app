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
    return state.forecasts
  },
  timeWeathers: function(state){
    return state.timeWeathers
  },
  timeTemps: function(state){
    return state.timeTemps
  },
  timePops: function(state){
    return state.timePops
  },
  weekWeathers: function(state){
    return state.weekWeathers
  },
  weekTemps: function(state){
    return state.weekTemps
  },
  tempAverage: function(state){
    return state.tempAverage
  },
  precipAverage: function(state){
    return state.precipAverage
  }
}

function dateformat(date){
  const y = date.getFullYear()
  const m = date.getMonth()+1
  const d = date.getDate()
  const day = '日月火水木金土'.charAt(date.getDay())
  const hh = date.getHours()
  const mm = date.getMinutes()
  return `${y}年${m}月${d}日（${day}）${hh}時${mm}分`
}

export const mutations = {
    setForecast: function(state, {param}){
        //console.log(param.timeWeathers)
        param.items.filter(f=>{
          if(f.reportDatetime){
          const date = new Date(f.reportDatetime)
          f.reportDatetime = dateformat(date)
          }
        })
        
        param.items[0].timeSeries.map(f=>{
            //console.log(f.timeDefines)
            f.timeDefines = f.timeDefines.map(e=>{
                const date = new Date(e)
                return dateformat(date)
            })
        })
        
        param.items[1].timeSeries.map(f=>{
            //console.log(f.timeDefines)
            f.timeDefines = f.timeDefines.map(e=>{
                const date = new Date(e)
                return dateformat(date)
            })
        })
        
        state.forecasts = param.items
        
        state.timeSeries = param.items[0].timeSeries
        state.timeWeathers = param.items[0].timeSeries[0]
        state.timePops = param.items[0].timeSeries[1]
        state.timeTemps = param.items[0].timeSeries[2]
        
        state.weekSeries = param.items[1].timeSeries
        state.weekWeathers = param.items[1].timeSeries[0]
        state.weekTemps = param.items[1].timeSeries[1]
        
        state.tempAverage = param.items[1].tempAverage.areas
        state.precipAverage = param.items[1].precipAverage.areas
    },

}

export const actions = {
    forecast: async function({commit},{url, area}){
        //console.log(commit)
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
                    
                    /*
                    timeSeries: res.data[0].timeSeries,
                    timeWeathers: res.data[0].timeSeries[0],
                    timePops: res.data[0].timeSeries[1],
                    timeTemps: res.data[0].timeSeries[2],
                    
                    weekSeries: res.data[1].timeSeries,
                    weekWeathers: res.data[1].timeSeries[0],
                    weekTemps: res.data[1].timeSeries[1]
                    */
                }
                commit('setForecast', {param})
            }
        })
    }
}