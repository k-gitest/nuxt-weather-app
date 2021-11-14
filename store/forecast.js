import axios from 'axios'

export const state = () => ({
    forecasts: [],
    timeSeries: [],
    weekSeries: [],
    tempAverage: [],
    precipAverage: [],
    timeWeathers: [],
    url: '',
    area: ''
})

export const mutations = {
    setForecast: function(state, {param}){
        //console.log(param.timeWeathers)
        state.forecasts = param.items
        
        state.timeSeries = param.timeSeries
        state.timeWeathers = param.timeWeathers
        /*
        stage.weekSeries = items[1].timeSeries
        state.tempAverage = items[1].tempAverage.areas
        state.precipAverage = items[1].precipAverage.areas
        */
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
                    timeWeathers: res.data[0].timeSeries[0]
                }
                commit('setForecast', {param})
            }
            //console.log(param)
            //commit('setForecast', {param})
        })
    }
}