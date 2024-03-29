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
    
    topArea:[
      [
        /*全国　17*/
        //釧路
        {
          top: "5%",
          left: "85%",
        },
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
      ],
      [
        /*北海道　8個（十勝入れて）*/
        //宗谷（稚内）
        {
          top: "25%",
          left: "35%",
        },
        //旭川（上川・留萌）
        {
          top:"35%",
          left:"25%",
        },
        //網走
        {
          top:"25%",
          left:"60%",
        },
        //釧路
        {
          top:"55%",
          left:"65%",
        },
        //室蘭（胆振・日高）
        {
          top:"60%",
          left:"45%",
        },
        //札幌（石狩・空知・後志）
        {
          top:"53%",
          left:"22%",
        },
        //函館（渡島・檜山）
        {
          top:"70%",
          left:"33%",
        },
        
      ],
      [
        /*東北　6個*/
        //青森
        {
          top: "15%",
          left: "45%",
        },
        //盛岡
        {
          top:"35%",
          left:"60%",
        },
        //仙台
        {
          top:"60%",
          left:"60%",
        },
        //秋田
        {
          top:"35%",
          left:"30%",
        },
        //山形
        {
          top:"55%",
          left:"25%",
        },
        //福島
        {
          top:"65%",
          left:"43%",
        },
      
      ],
      [
        /*関東・甲信越　9個*/
        //水戸
        {
          top: "25%",
          left: "60%",
        },
        //宇都宮
        {
          top:"20%",
          left:"50%",
        },
        //前橋
        {
          top:"20%",
          left:"39%",
        },
        //さいたま
        {
          top:"40%",
          left:"45%",
        },
        //千葉
        {
          top:"65%",
          left:"55%",
        },
        //東京
        {
          top:"45%",
          left:"57%",
        },
        //横浜
        {
          top:"60%",
          left:"40%",
        },
        //長野
        {
          top:"40%",
          left:"30%",
        },
        //山梨
        {
          top:"57%",
          left:"30%",
        },
      
      ],
      /*東海　4個*/
      [
        //岐阜
        {
          top: "43%",
          left: "30%",
        },
        //静岡
        {
          top:"50%",
          left:"62%",
        },
        //名古屋
        {
          top:"65%",
          left:"52%",
        },
        //津
        {
          top:"60%",
          left:"35%",
        },
        
      
      ],
      /*関西　6個*/
      [
        //大津（滋賀）
        {
          top: "35%",
          left: "60%",
        },
        //京都
        {
          top:"20%",
          left:"45%",
        },
        //大阪
        {
          top:"47%",
          left:"45%",
        },
        //神戸
        {
          top:"40%",
          left:"32%",
        },
        //奈良
        {
          top:"55%",
          left:"60%",
        },
        //和歌山
        {
          top:"70%",
          left:"47%",
        },
      
      ],
      /*中国　4個*/
      [
        //鳥取
        {
          top: "25%",
          left: "60%",
        },
        //島根
        {
          top:"25%",
          left:"45%",
        },
        //岡山
        {
          top:"55%",
          left:"55%",
        },
        //広島
        {
          top:"60%",
          left:"43%",
        },
        
      
      ],
      /*四国　4個*/
      [
        //徳島
        {
          top: "55%",
          left: "57%",
        },
        //香川
        {
          top:"35%",
          left:"65%",
        },
        //愛媛
        {
          top:"35%",
          left:"35%",
        },
        //高知
        {
          top:"55%",
          left:"30%",
        },
        
      
      ],
      /*九州　6個*/
      [
        //山口
        {
          top: "5%",
          left: "65%",
        },
        //福岡
        {
          top:"10%",
          left:"50%",
        },
        //佐賀
        {
          top:"15%",
          left:"37%",
        },
        //長崎
        {
          top:"25%",
          left:"25%",
        },
        //熊本
        {
          top:"45%",
          left:"35%",
        },
        //大分
        {
          top:"30%",
          left:"60%",
        },
      
      ],
      /*沖縄　4個*/
      [
        //那覇
        {
          top: "35%",
          left: "50%",
        },
        //南大東島
        {
          top:"55%",
          left:"70%",
        },
        //宮古島
        {
          top:"55%",
          left:"20%",
        },
        //石垣島
        {
          top:"55%",
          left:"5%",
        },
        
      
      ],
      
  ],
})

export const getters = {
  centers: function(state){
    return state.centers
  },
  offices: function(state){
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
  },
  topArea: function(state){
    return state.topArea
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

function topAreaNameChange(area){
  //console.log(area)
  switch(area){
    case '011000':
      return '稚内'
    break
    case '013000':
      return '網走'
    break
    case '014100':
      return '釧路'
    break
    case '015000':
      return '室蘭'
    break
    case '017000':
      return '函館'
    break
    case '012000':
      return '旭川'
    break
    case '016000':
      return '札幌'
    break
    case '020000':
      return '青森'
    break
    case '030000':
      return '盛岡'
    break
    case '050000':
      return '秋田'
    break
    case '040000':
      return '仙台'
    break
    case '060000':
      return '山形'
    break
    case '070000':
      return '福島'
    break
    case '150000':
      return '新潟'
    break
    case '170000':
      return '金沢'
    break
    case '130000':
      return '東京'
    break
    case '080000':
      return '水戸'
    break
    case '090000':
      return '宇都宮'
    break
    case '100000':
      return '前橋'
    break
    case '110000':
      return 'さいたま'
    break
    case '120000':
      return '千葉'
    break
    case '140000':
      return '横浜'
    break
    case '160000':
      return '富山'
    break
    case '180000':
      return '福井'
    break
    case '190000':
      return '甲府'
    break
    case '200000':
      return '長野'
    break
    case '210000':
      return '岐阜'
    break
    case '220000':
      return '静岡'
    break
    case '230000':
      return '名古屋'
    break
    case '240000':
      return '津'
    break
    case '250000':
      return '大津'
    break
    case '260000':
      return '京都'
    break
    case '270000':
      return '大阪'
    break
    case '280000':
      return '神戸'
    break
    case '290000':
      return '奈良'
    break
    case '300000':
      return '和歌山'
    break
    case '310000':
      return '鳥取'
    break
    case '330000':
      return '岡山'
    break
    case '350000':
      return '山口'
    break
    case '360000':
      return '徳島'
    break
    case '370000':
      return '高松'
    break
    case '380000':
      return '松山'
    break
    case '320000':
      return '松江'
    break
    case '340000':
      return '広島'
    break
    case '390000':
      return '高知'
    break
    case '400000':
      return '福岡'
    break
    case '410000':
      return '佐賀'
    break
    case '420000':
      return '長崎'
    break
    case '430000':
      return '熊本'
    break
    case '440000':
      return '大分'
    break
    case '450000':
      return '宮崎'
    break
    case '460100':
      return '鹿児島'
    break
    case '471000':
      return '那覇'
    break
    case '472000':
      return '大東島'
    break
    case '473000':
      return '宮古'
    break
    case '474000':
      return '石垣'
    break
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
    
    param.items[1].timeSeries.map(f=>{
        f.timeDefines = f.timeDefines.map((e,index)=>{
          return dateformat(e,3,index)
        })
    })
    
    state.forecasts = param.items
    state.timeSeries = param.items[0].timeSeries
    
    //地域詳細ページの処理
    if(state.class20s[state.area_details] ){
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
      
      //console.log(isWeek, noneWeek, timeArea, weekArea )
      
      //直近と週間のエリア数が同じもしくは週間エリア数が１の場合
      if(timeLength === weekLength || weekLength === 1){
        //console.log('yes')
        param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
          //console.log(f.area.code, timeCode, param.area)
          if(f.area.code === timeCode)return f
          if(f.area.code === param.area)return f
          if(f.area.code === '014000')return f
        })
      }
      
      //直近と週間のエリア数が異なるもしくは週間エリア数が１より多い場合
      if(timeLength !== weekLength && weekLength > 1){
        noneWeek.map((m,index)=>{
          
          if(timeCode.indexOf(m) === 0){
            param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
              if(f.area.code === area100p){return f}
            })
          }
          
          if(timeCode.indexOf(m) === -1 && timeCode.indexOf(isWeek) === 0){
            param.items[1].timeSeries[0].areas = param.items[1].timeSeries[0].areas.filter(f=>{
              if(f.area.code === timeCode)return f
            })
          }

        })
      }
    }
    
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
    
    param.items[1].timeSeries.map((m,index)=>{
      state.weekTime.push(m.timeDefines)
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
    
    if(param.topIndex && state.topWeathers.length < 17){
      topAreaName(param.area)
      //console.log(Array.isArray(param.items[0].timeSeries[0]))
      /*
      let topForecast = [

        {id: param.area},
        {timeWeathers: param.items[0].timeSeries[0]},
        {timeTemps: param.items[0].timeSeries[2]},
        {timePops: param.items[0].timeSeries[1]},
        {weekWeathers: param.items[1].timeSeries[0]},
        {weekTemps: param.items[1].timeSeries[1]}
      ]
      */
      
      
      let topForecast = {

        id: param.area,
        'timeWeathers': param.items[0].timeSeries[0],
        'timeTemps': param.items[0].timeSeries[2],
        'timePops': param.items[0].timeSeries[1],
        'weekWeathers': param.items[1].timeSeries[0],
        'weekTemps': param.items[1].timeSeries[1]
      }
      
      //console.log(Array.isArray(topForecast.id))
      state.topWeathers.push(topForecast)

    }
  },
  
  setTopMap: function(state,{param}){
    //console.log(param.length)
    state.topWeathers = []
    param.filter(f=>{
      //console.log(f)
      
      f.items.filter(item=>{
        if(item.reportDatetime){
          item.reportDatetime = dateformat(item.reportDatetime, 1)
        }
      })
      
      f.items[1].timeSeries.map((m,index)=>{
        state.weekTime.push(m.timeDefines)
      })
      
      f.items[1].timeSeries.map(m=>{
          m.timeDefines = m.timeDefines.map((e,index)=>{
            return dateformat(e,3,index)
          })
      })
      //console.log(state.topWeathers.length, param.length)
      if(f.topIndex &&  param.length){
        //f.items[1].timeSeries[0].areas.length = 1
        const mapAreaName = topAreaNameChange(f.area)
        //console.log(mapAreaName)
        if(mapAreaName){
          f.items[1].timeSeries[0].areas[0].area.name = mapAreaName
        }
        //console.log(f.items[1].timeSeries[0].areas[0].area.name)
        //console.log(f.areaTab)
        let topForecast = {
          id: f.area,
          topArea: state.topArea[f.areaTab],
          'timeWeathers': f.items[0].timeSeries[0],
          'timeTemps': f.items[0].timeSeries[2],
          'timePops': f.items[0].timeSeries[1],
          'weekWeathers': f.items[1].timeSeries[0],
          'weekTemps': f.items[1].timeSeries[1]
        }
        //console.log(topForecast)
        state.topWeathers.push(topForecast)
      }
      
    })
    
  },

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
      //'012000', //旭川
      '016000', //札幌
      '020000', //青森
      '050000', //秋田
      '040000', //仙台
      '150000', //新潟
      '170000', //金沢
      '130000', //東京
      //'090000', //宇都宮
      '200000', //長野
      '230000', //名古屋
      '270000', //大阪
      //'370000', //高松
      '320000', //松江
      '340000', //広島
      '390000', //高知
      '400000', //福岡
      '460100', //鹿児島
      //'460040', //奄美
      '471000', //那覇
      //'474000', //石垣
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
  },
  
  forecast: async function({commit},{url, area, area_detail}){

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
  },
  
  forecastAll: async function({commit},{mapArea,areaTab}){
    //console.log(mapArea, areaTab)
    const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/'
    const area = [
      '014100', //釧路
      //'012000', //旭川
      '016000', //札幌
      '020000', //青森
      '050000', //秋田
      '040000', //仙台
      '150000', //新潟
      '170000', //金沢
      '130000', //東京
      //'090000', //宇都宮
      '200000', //長野
      '230000', //名古屋
      '270000', //大阪
      //'370000', //高松
      '320000', //松江
      '340000', //広島
      '390000', //高知
      '400000', //福岡
      '460100', //鹿児島
      //'460040', //奄美
      '471000', //那覇
      //'474000', //石垣
    ]

    if(!mapArea){
      mapArea = area
    }
    
    mapArea = mapArea.filter(f=>{
      if(f !== '014030' && f !== '460040') return f
    })
    
    //console.log(mapArea)
    const param = await Promise.all(
      
      mapArea.map(f=>axios.get(url + f + '.json')
      .then(res=>{
        const areaAll = {
         items : res.data,
         area: f,
         topIndex: true,
         areaTab: areaTab,
        }
        return areaAll
      }))
    )
    .then(res => res)
    .catch((e) => console.log(e));

    //console.log(param.length)
    //console.log(param)
    commit('setTopMap', {param})
    
  }
  
    
}