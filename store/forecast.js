import axios from 'axios'

export const state = () => ({
    weathers: [],
    url: 'https://www.jma.go.jp/bosai/forecast/data/',
    area: 'overview_forecast/130000.json'
})

export const mutations = {
    setForecast: function(state, data){
        state.weathers = data
    }
}

export const actions = {
    forecast: async function({context}){
        const data = await axios.get(url + area)
        commit ('setForecast', data)
    }
}