//クラシックモード
/*
export default new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        
    },
    
})
*/

//モジュールモード
import axios from 'axios'

//stateはdataプロパティと同じ様なもの
export const state = () => ({
    message: 'Hello Vuex',
    users: [
            {name: 'John', email:'john@example.com', age:22},
    	    {name: 'Merry', email: 'merry@facebook.com',age:33},
    	    {name: 'Ken', email: 'ken@amazon.com',age:29}
        ],
    count: 0,//カウント初期値
    t_users: [],
    sample: 'sample',
    mes: 'message'
})

export const getters = {
  users: function(state){
      return state.users.filter(user => user.age < 30 )
  },
  double: function(state){
      return state.count**2
  }
}

export const mutations = {
    increment: function(state, num){
        //カウント更新処理 payload用の引数も用意できる
        state.count = state.count + num
    },
    
    increment_act: function(state){
        state.count++
    },
    
    setUsers: function(state, posts){
        state.t_users = posts
    },
    
    mouse: function(state){
        state.sample = state.sample + state.mes
    }
    
}

export const actions = {
    incrementOne: function(context){
        //mutationsを起動する
        context.commit('increment_act')
        
        //非同期テスト 3秒後にカウントが増える
        setTimeout(() => {
            context.commit('increment_act')
        }, 3000)
    },
    /*contextの中でcommitしか使わないのであればES6のDestructuringで短縮もできる
    incrementOne: function({commit}){
        commit('increment_act')
    }
    */
    getUsers:async function({commit}){
        
        // @nuxtjs/axiosを使用する場合
        const posts = await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
            //console.log(posts)
            commit('setUsers', posts)
        
        /*
        // 通常のaxiosを使用する場合
        return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response  => {
            commit('setUsers', response.data)
        })
        */
    },
    textTest: function({commit}){
        commit('mouse')
    }
    
    
}

export const modules = {

}
