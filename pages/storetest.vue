<template>
  <div id="app">
    <h1>{{ store_msg }}</h1>
    <StoreX />
  </div>
</template>

<script>
import StoreX from '@/components/StoreX.vue'

export default {
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
          return this.$store.state.storetest.message
      }
  }
}

</script>