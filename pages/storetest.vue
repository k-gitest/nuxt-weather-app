<template>
  <div id="app">
    <h1>{{ store_msg }}</h1>
    <StoreX />
    <ul>
        <li v-for="user in users">{{ user.name }} {{ user.mail}} {{ user.age }}</li>
    </ul>
    <div>
        <button @click="increment">カウントボタン</button>
        <button @click="increment_act">actionボタン</button>
        <p>カウント：{{ count }}</p>
    </div>
  </div>
</template>

<script>
import StoreX from '@/components/StoreX.vue'

export default {
  namespace: true,
  name: 'app',
  data: function(){
    return {
      message : ''
    }
  },
  //子コンポーネントからでもstoreにアクセスできる
  components: {
      StoreX
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
  },
  methods: {
      increment: function(){
          //mutationの呼び出し commitを使用する 第二引数のpayloadで値を渡す
          this.$store.commit('storetest/increment', 1)
      },
      
      increment_act: function(){
          //actionsの呼び出し dispatchを使用する
          this.$store.dispatch('storetest/incrementOne')
      }
      
  },
}

</script>