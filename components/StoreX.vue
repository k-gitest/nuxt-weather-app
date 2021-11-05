<template>
  <div>
    <h2>{{ message }}</h2>
    <ul>
        <li v-for="user in users">{{ user.name }} {{ user.email }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloVuex',
  computed:{
      /*
      users: function(){
          return this.$store.state.storetest.users
      },
      */
      // 複数のstateも読み込める
      ...mapState('storetest', ['message','users'])
  }
}
</script>
