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
    dateNow:[], //降水確率用の配列
    timeNow:[], //日付時刻用の配列
    
    centers:[],
    offices:[],
    class10s:[],
    class15s:[],
    class20s:[],
    overview:[],
    
    recentTime:[],//日付変換用
    popTime:[],//降水量変換用
    weekTime:[],//週間日付変換用
    area_id:[],//広域エリア用
    area_details:[],//詳細地域エリア用
    topWeathers:[],//トップページ用
})

export const getters = {
  centers: function(state){
    return state.centers
  },
  offices: function(state){
    /*
    console.log(state.area_details)
    if(state.area_details === '014030' || state.area === '014100'){
      state.offices.filter(f=>{
          return state.area_id['014100'] === state.area_id['014030']
      })
    }else{
      return state.offices
    }
    */
    return state.offices
    
  },
  class10s: function(state){
    return state.class10s
  },
  class15s: function(state){
    return state.class15s
  },
  class20s:function(state){
    return state.class20s
  },
  
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
  },
  recentTime: function(state){
    const recentTime = state.recentTime.map((m,index)=>{
      if(index === 0)return  dateformat(m,2,0)
      else if(index === 1) return dateformat(m,2,1)
      else if(index === 2) return dateformat(m,2,2)
    })
    return recentTime
  },
  popTime: function(state){
    return state.popTime
  },
  weekTime: function(state){
    const weekTime = state.weekTime.map(m=>{
      return m.map(f=>{
        return dateformat(f,3)
      })
    })
    return weekTime
  },
  area_details: function(state){
    return state.area_details
  },
  area_id: function(state){
    return state.area_id
  },
  topWeathers: function(state){
    return state.topWeathers
  }
}

/*日付変換処理*/
function dateformat(date, long, index){ //日付配列、変換分岐、昼夜変換分岐

  date = date.replace('+09:00','')
  date = new Date(date)
  
  //現在時刻の取得
  const nowHours = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))

  const y = date.getFullYear()
  const m = date.getMonth()+1
  const d = date.getDate()
  const day = '日月火水木金土'.charAt(date.getDay())
  const hh = date.getHours()
  const mm = date.getMinutes()
  
  if(long === 1){
    return `${y}年${m}月${d}日（${day}）${hh}時`
  }else if(long === 2){
    //console.log(nowHours)
    if(17 >= nowHours >= 5 && index === 0){
      return `今日${d}日（${day}）`
    }else if(nowHours >= 17 && index === 0){
      return `今夜${d}日（${day}）`
    }else if(index === 1){
      return `明日${d}日（${day}）`
    }else if(index === 2){
      return `明後日${d}日（${day}）`
    }
  }else if(long === 3){
    if(index === 0){
      return `明日${d}日（${day}）`
    }else if(index === 1){
      return `明後日${d}日（${day}）`
    }else{
      return `${d}日（${day}）`
    }
  }
}

export const mutations = {

  setArea: function(state, {areadata}){
    state.centers = areadata.centers
    state.offices = areadata.offices
    state.class10s = areadata.class10s
    state.class15s = areadata.class15s
    state.class20s = areadata.class20s
  },
  
  setForecast: function(state, {param}){
    
    //初期化
    state.area_id = []
    state.area_details = []
    state.area_id = param.area
    state.area_details = param.area_detail
    
    //十勝エリアと奄美エリアの分岐処理
    if(param.area === '014100' && !param.area_detail){
      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter(f=>{
        if(f.area.code !== '014030'){
          return f
        }
      })
    }
    if(param.area_detail === '014030'){
      state.area_details = ''
      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter(f=>{
        if(f.area.code === '014030'){
          return f
        }
      })
    }
    if(param.area === '460100' && !param.area_detail){
      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter(f=>{
        if(f.area.code !== '460040'){
          return f
        }
      })
      param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
        if(f.area.code !== '460040'){
          return f
        }
      })
    }
    if(param.area_detail === '460040'){
      state.area_details = ''
      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter(f=>{
        if(f.area.code === '460040'){
          return f
        }
      })
      param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
        if(f.area.code === '460040'){
          return f
        }
      })
    }
    
    //気象庁の発表時刻処理
    param.items.filter(f=>{
      if(f.reportDatetime){
        f.reportDatetime = dateformat(f.reportDatetime, 1)
      }
    })
    
    //降水確率表示用の配列作成処理
    param.items[0].timeSeries.filter((f,index)=>{
      if(index === 0){
        state.dateNow = [] //日付配列初期化
        state.timeNow = []
        f.timeDefines.map((m,index)=>{
          state.timeNow.push(dateformat(m,2,index))
          const now = []
          m = m.replace('+09:00','')
          const dateNow = new Date(m)
          
          for(let i=0;i<4;i++){
            const y = dateNow.getFullYear()
            const m = ('0' + (dateNow.getMonth()+1)).slice(-2) //sliceで二桁表示
            const d = ('0' + dateNow.getDate()).slice(-2)
            const h = ('0'+dateNow.getHours(dateNow.setHours(i*6))).slice(-2)
            const mm = ('0'+dateNow.getMinutes(dateNow.setMinutes(0))).slice(-2)
            const s = ('0'+dateNow.getSeconds(dateNow.setSeconds(0))).slice(-2)
            now.push(`${y}-${m}-${d}T${h}:${mm}:${s}+09:00`)
          }
          state.dateNow.push(now)
        })
      }
    })
    
    param.items[0].timeSeries.map((m,index)=>{
      if(index === 0)state.recentTime = m.timeDefines
      if(index === 1)state.popTime = m.timeDefines
    })
    
    param.items[1].timeSeries.filter((m,index)=>{
      state.weekTime[index] = m.timeDefines
    })
    
    /*
    param.items[0].timeSeries[0].timeDefines.filter(m=>{
      state.timeNow.push(dateformat(m,2))
      const now = []
      m = m.replace('+09:00','')
      const dateNow = new Date(m)
      
      for(let i=0;i<4;i++){
        const y = dateNow.getFullYear()
        const m = dateNow.getMonth()+1
        const d = dateNow.getDate()
        const h = ('0'+dateNow.getHours(dateNow.setHours(i*6))).slice(-2)
        const mm = ('0'+dateNow.getMinutes(dateNow.setMinutes(0))).slice(-2)
        const s = ('0'+dateNow.getSeconds(dateNow.setSeconds(0))).slice(-2)
        now.push(`${y}-${m}-${d}T${h}:${mm}:${s}+09:00`)
        
        dateNow.setHours(i*6)
        dateNow.setMinutes(0)
        dateNow.setSeconds(0)
        dateNow.setMilliseconds(0)
        
        //now.push(dateNow.toISOString().split('.000Z')[0] + '+09:00')
      }
      state.dateNow.push(now)
    })
    */
    
    param.items[1].timeSeries.map(f=>{
        f.timeDefines = f.timeDefines.map((e,index)=>{
          return dateformat(e,3,index)
        })
    })
    
    state.forecasts = param.items
    state.timeSeries = param.items[0].timeSeries
    
    //地域詳細ページの処理
    if(state.class20s[state.area_details] ){
      //console.log(param.area_detail)
      //class20s_area：class10sの地域コード
      //param.area：officesの地域コード 広域全体エリアなので必ず1つ
      //area100p：offices地域コードの末尾3桁を100にしたコード
      //長崎、鹿児島、福島、青森、長野、岩手
      //timeArea：直近天気にあるエリアコード
      const class20s_area = state.class15s[state.class20s[state.area_details].parent].parent
      const class10s_area = state.class10s[state.class15s[state.class20s[state.area_details].parent].parent]
      const area100p = param.area.slice(0,-3)+'100'
      const timeArea = param.items[0].timeSeries[0].areas.map(m=>m.area.code)

      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter((f, index)=>{
        if(f.area.code === class20s_area){
          return f
        }
      })
      
      //直近天気の地域コード
      const timeCode = param.items[0].timeSeries[0].areas[0].area.code
      //週間天気の表示処理　直近天気の地域と合わせる
      const timeLength = timeArea.length
      const weekLength = param.items[1].timeSeries[0].areas.length
      
      //週間天気エリアコード
      const weekArea = param.items[1].timeSeries[0].areas.map(m=>m.area.code)
      //週間天気にないエリアコード
      const noneWeek = timeArea.filter(f=>{if(weekArea.indexOf(f) === -1)return f})
      //共通エリア
      //複数配列を統合して重複要素を取得する
      const arrsUnique = timeArea.concat(weekArea)
      const isWeek = arrsUnique.filter((f,index,arr)=>{
        return arr.indexOf(f) == index && index !== arr.lastIndexOf(f)
      })
      
      console.log(isWeek, noneWeek, timeArea, weekArea )
      
      //直近と週間のエリア数が同じもしくは週間エリア数が１の場合
      if(timeLength === weekLength || weekLength === 1){
        //console.log('yes')
        param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
          console.log(f.area.code, timeCode, param.area)
          if(f.area.code === timeCode)return f
          if(f.area.code === param.area)return f
          if(f.area.code === '014000')return f
        })
      }
      
      //直近と週間のエリア数が異なるもしくは週間エリア数が１より多い場合
      if(timeLength !== weekLength && weekLength > 1){
        //console.log(timeLength, weekLength)
        noneWeek.map((m,index)=>{
          
          if(timeCode.indexOf(m) === 0){
            //console.log(m)
            param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
              if(f.area.code === area100p){return f}
            })
          }
          
          if(timeCode.indexOf(m) === -1 && timeCode.indexOf(isWeek) === 0){
            //console.log(m)
            param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
              if(f.area.code === timeCode)return f
            })
          }

        })
      }
    }
    
    /*
    if(param.area_detail){
      param.items[0].timeSeries[0].areas = param.items[0].timeSeries[0].areas.filter(f=>{
        if(f.area.code === param.area_detail){
          return f
        }
      })
    }
    */
    
    param.items[0].timeSeries[0].areas.map(f=>{
      f.weathers = f.weathers.map(m=>{
          return m.replace(/\s+/g, '') //文章の空白削除
      })
    })
    
    state.timeWeathers = param.items[0].timeSeries[0]
    state.timePops = param.items[0].timeSeries[1]
    state.timeTemps = param.items[0].timeSeries[2]
    
    state.weekSeries = param.items[1].timeSeries
    state.weekWeathers = param.items[1].timeSeries[0]
    state.weekTemps = param.items[1].timeSeries[1]
    
    state.tempAverage = param.items[1].tempAverage.areas
    state.precipAverage = param.items[1].precipAverage.areas
 
  },
  
  setOverview: function(state,{param}){
    param.items.reportDatetime = dateformat(param.items.reportDatetime,1)
    state.overview = param.items
  },
  
  setTop: function(state,{param}){
    
    param.items.filter(f=>{
      if(f.reportDatetime){
        f.reportDatetime = dateformat(f.reportDatetime, 1)
      }
    })
    
    //降水確率表示用の配列作成処理
    param.items[0].timeSeries.filter((f,index)=>{
      if(index === 0){
        state.dateNow = [] //日付配列初期化
        state.timeNow = []
        f.timeDefines.map((m,index)=>{
          state.timeNow.push(dateformat(m,2,index))
          const now = []
          m = m.replace('+09:00','')
          const dateNow = new Date(m)
          
          for(let i=0;i<4;i++){
            const y = dateNow.getFullYear()
            const m = ('0' + (dateNow.getMonth()+1)).slice(-2) //sliceで二桁表示
            const d = ('0' + dateNow.getDate()).slice(-2)
            const h = ('0'+dateNow.getHours(dateNow.setHours(i*6))).slice(-2)
            const mm = ('0'+dateNow.getMinutes(dateNow.setMinutes(0))).slice(-2)
            const s = ('0'+dateNow.getSeconds(dateNow.setSeconds(0))).slice(-2)
            now.push(`${y}-${m}-${d}T${h}:${mm}:${s}+09:00`)
          }
          state.dateNow.push(now)
        })
      }
    })
    
    param.items[0].timeSeries.map((m,index)=>{
      if(index === 0)state.recentTime = m.timeDefines
      if(index === 1)state.popTime = m.timeDefines
    })
    
    param.items[1].timeSeries.filter((m,index)=>{
      state.weekTime[index] = m.timeDefines
    })
    
    param.items[1].timeSeries.map(f=>{
        f.timeDefines = f.timeDefines.map((e,index)=>{
          return dateformat(e,3,index)
        })
    })
    
    param.items[0].timeSeries[0].areas.map(f=>{
      f.weathers = f.weathers.map(m=>{
          return m.replace(/\s+/g, '') //文章の空白削除
      })
    })
    
    //トップページ用の表示処理
    function topAreaName(area){
      //area.find(f === '014100' console.log(f))
      const areaName = param.items[1].timeSeries[0].areas[0].area.name
      switch(area){
        case '014100':
          param.items[1].timeSeries[0].areas[0].area.name = '釧路'
        break
        case '012000':
          param.items[1].timeSeries[0].areas[0].area.name = '旭川'
        break
        case '016000':
          param.items[1].timeSeries[0].areas[0].area.name = '札幌'
        break
        case '020000':
          param.items[1].timeSeries[0].areas[0].area.name = '青森'
          param.items[1].timeSeries[0].areas.pop()
        break
        case '050000':
          param.items[1].timeSeries[0].areas[0].area.name = '秋田'
        break
        case '040000':
          param.items[1].timeSeries[0].areas[0].area.name = '仙台'
          param.items[1].timeSeries[0].areas.pop()
        break
        case '150000':
          param.items[1].timeSeries[0].areas[0].area.name = '新潟'
        break
        case '170000':
          param.items[1].timeSeries[0].areas[0].area.name = '金沢'
        break
        case '130000':
          param.items[1].timeSeries[0].areas[0].area.name = '東京'
          param.items[1].timeSeries[0].areas.length = 1
        break
        case '090000':
          param.items[1].timeSeries[0].areas[0].area.name = '宇都宮'
        break
        case '200000':
          param.items[1].timeSeries[0].areas[0].area.name = '長野'
          param.items[1].timeSeries[0].areas.length = 1
        break
        case '230000':
          param.items[1].timeSeries[0].areas[0].area.name = '名古屋'
        break
        case '270000':
          param.items[1].timeSeries[0].areas[0].area.name = '大阪'
        break
        case '370000':
          param.items[1].timeSeries[0].areas[0].area.name = '高松'
        break
        case '320000':
          param.items[1].timeSeries[0].areas[0].area.name = '松江'
        break
        case '340000':
          param.items[1].timeSeries[0].areas[0].area.name = '広島'
          param.items[1].timeSeries[0].areas.length = 1
        break
        case '390000':
          param.items[1].timeSeries[0].areas[0].area.name = '高知'
        break
        case '400000':
          param.items[1].timeSeries[0].areas[0].area.name = '福岡'
        break
        case '460100':
          param.items[1].timeSeries[0].areas[0].area.name = '鹿児島'
          param.items[1].timeSeries[0].areas.length = 1
        break
        case '471000':
          param.items[1].timeSeries[0].areas[0].area.name = '那覇'
        break
        case '474000':
          param.items[1].timeSeries[0].areas[0].area.name = '石垣'
        break
      }
    }
    
    if(param.topIndex && state.topWeathers.length < 21){
      topAreaName(param.area)
      let topForecast = {
        'id': param.area,
        'timeWeathers': param.items[0].timeSeries[0],
        'timeTemps': param.items[0].timeSeries[2],
        'timePops': param.items[0].timeSeries[1],
        'weekWeathers': param.items[1].timeSeries[0],
        'weekTemps': param.items[1].timeSeries[1]
      }
    
      state.topWeathers.push(topForecast)
      
      /*
      let topForecast = {}
      topForecast[param.area] = {
        'timeWeathers': param.items[0].timeSeries[0],
        'timeTemps': param.items[0].timeSeries[2],
        'timePops': param.items[0].timeSeries[1],
        'weekWeathers': param.items[1].timeSeries[0],
        'weekTemps': param.items[1].timeSeries[1]
      }
      */
    }
    
    // setオブジェクトでの配列作成
    /*
    let area = param.area
    var set = new Set()

    set.add({
      [area] : 
      {
        'timeWeathers': param.items[0].timeSeries[0],
        'timeTemps': param.items[0].timeSeries[2],
        'timePops': param.items[0].timeSeries[1],
        'weekWeathers': param.items[1].timeSeries[0],
        'weekTemps': param.items[1].timeSeries[1]
      }
    })
    
    state.arraySet += Array.from(set)
    console.log(Array.from(set))
    */
  }

}

export const actions = {
  forecastIndex: async function({commit}){
    const url = 'https://www.jma.go.jp/bosai/common/const/area.json'
    return await axios.get(url)
    .then(res => {
      const areadata = res.data
      commit('setArea', {areadata})
    })
  },
  
  forecastTop: async function({commit}){
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const area = [
      '014100', //釧路
      '012000', //旭川
      '016000', //札幌
      '020000', //青森
      '050000', //秋田
      '040000', //仙台
      '150000', //新潟
      '170000', //金沢
      '130000', //東京
      '090000', //宇都宮
      '200000', //長野
      '230000', //名古屋
      '270000', //大阪
      '370000', //高松
      '320000', //松江
      '340000', //広島
      '390000', //高知
      '400000', //福岡
      '460100', //鹿児島
      //'460040', //奄美
      '471000', //那覇
      '474000', //石垣
    ]

    
    for(const f of area){
      await axios.get(url + f + '.json')
      .then(res=>{
        const param = {
          items:res.data,
          area:f,
          topIndex:true,
        }
        return commit('setTop', {param})
      })
      .catch(e => {
        // エラー
        console.log(e,f)
      })
    }
    

    /*
    await area.map(async (f,index)=>{
      return await axios.get(url + f + '.json')
      .then(res=>{
        const param = {
                    items:res.data,
                    area:f,
                    topIndex:true
                    //area_detail:area_detail,
                }
                commit('setTop', {param})
      })
      .catch(e => {
        // エラー
        console.log(e,f)
      })
    })
    */

    /*
    Promise.all(
      [axios.get(url + url_1), axios.get(url + url_2), axios.get(url + url_3)]
    ).then(res=>{
      const param = {
                  items:res.data,
                  area:url_1,
                  area_detail:area_detail,
              }
              commit('setForecast', {param})
    })
    */
  },
  
  forecast: async function({commit},{url, area, area_detail}){
      //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
      //const area = 'overview_forecast/130000.json'
      if(area === '014030' && !area_detail){
        area = '014100'
        area_detail = '014030'
      }
      if(area === '014030' && area_detail){
        area = '014100'
      }
      if(area === '460040' && !area_detail){
        area = '460100'
        area_detail = '460040'
      }
      if(area === '460040' && area_detail){
        area = '460100'
      }
      return await axios.get(url + area + '.json')
      .then(res => {
          if(area.includes('overview')){
              const param = {
                  items: res.data,
              }
              commit('setForecast', {param})
          }else{
              const param = {
                  items:res.data,
                  area:area,
                  area_detail:area_detail,
              }
              commit('setForecast', {param})
          }
      })
      .catch(e => {
        // エラー
        console.log(e)
      })
  },
  
  forecastOverview: async function({commit},{url_overview,area}){
    if(area === '014030')area = '014100'
    if(area === '460040')area = '460100'
    return await axios.get(url_overview + area + '.json')
    .then(res=>{
      const param = {
        items: res.data,
      }
      commit('setOverview', {param})
    })
    .catch(e => {
      // エラー
      console.log(e)
    })
  }
  
    
}