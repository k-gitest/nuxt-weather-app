<template>
  <div id="app">
    <h1>{{ store_msg }}</h1>
    <p>子コンポーネント読み込み</p>
    <StoreX />
    <p>{{ sample }}</p>
    <button @click="mouse">オス</button>
    <ul>
        <li v-for="user in users">{{ user.name }} {{ user.mail}} {{ user.age }}</li>
    </ul>
    <div>
        <button @click="increment">カウントボタン</button>
        <button @click="increment_act">時間差actionボタン</button>
        <button @click="textTest">文字追加</button>
        <p>カウント：{{ count }}</p>
        <p>カウント二乗：{{ double }}</p>
    </div>
    
    <h2>ユーザー一覧</h2>
    <div v-for="t_user in t_users" :key=t_user.id>
        {{ t_user.name }}
    </div>
    
    <div>
        <h2>チャート</h2>
        <TestChart />
        
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  //namespace: true,
  name: 'app',
  data: function(){
    return {
      message : ''
    }
  },

  //アクセス名の変更をしてみる
  computed: {
      store_msg: function(){
          //stateの呼び出し
          return this.$store.state.storetest.message
      },
      count: function(){
          return this.$store.state.storetest.count
      },
      users: function(){
          //gettersの呼び出し
          return this.$store.getters['storetest/users']
      },
      t_users: function(){
          return this.$store.state.storetest.t_users
      },
      //ヘルパー関数でmaping
      // 第一引数は名前空間、第二引数はstate名やaction名など
      // ...のSpread Operatorを使用する
      ...mapState('storetest', ['sample']),
      ...mapGetters('storetest', ['double'])
  },
  methods: {
      increment: function(){
          //mutationの呼び出し commitを使用する 第二引数のpayloadで値を渡す
          this.$store.commit('storetest/increment', 1)
      },
      //map
      ...mapMutations('storetest', ['mouse']),
      
      increment_act: function(){
          //actionsの呼び出し dispatchを使用する
          this.$store.dispatch('storetest/incrementOne')
      },
      ...mapActions('storetest', ['textTest'])
  },
  mounted(){
      // 非同期通信で外部apiを呼び出す
      this.$store.dispatch('storetest/getUsers')
  },
  
}

</script>