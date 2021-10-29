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
//stateはdataプロパティと同じ様なもの
export const state = () => ({
    message: 'Hello Vuex',
    users: [
            {name: 'John', email:'john@example.com', age:22},
    	    {name: 'Merry', email: 'merry@facebook.com',age:33},
    	    {name: 'Ken', email: 'ken@amazon.com',age:29}
        ],
    count: 0,//カウント初期値
})

export const getters = {
  users: function(state){
      return state.users.filter(user => user.age < 30 )
  }
}

export const mutations = {
    increment: function(state, num){
        //カウント更新処理 payload用の引数も用意できる
        state.count = state.count + num
    },
    
    increment_act: function(state){
        state.count++
    }
    
}

export const actions = {
    incrementOne: function(context){
        //console.log(context)
        //mutationsを起動する
        context.commit('increment_act')
    }
}

export const modules = {

}
