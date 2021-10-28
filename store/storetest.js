//モジュールモード

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

//stateはdataプロパティと同じ様なもの
export const state = () => ({
    message: 'Hello Vuex',
    users: [
            {name: 'John', email:'john@example.com', age:22},
    	    {name: 'Merry', email: 'merry@facebook.com',age:33},
    	    {name: 'Ken', email: 'ken@amazon.com',age:29}
        ]
})

export const getters = {
  
}

export const mutations = {

}

export const actions = {

}

export const modules = {

}
