<template>
  <div>
    <h2>{{ $store.state.storetest.message }}</h2>
    <ul>
        <li v-for="user in users">{{ user.name }} {{ user.email }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloVuex',
  computed:{
      users: function(){
          return this.$store.state.storetest.users
      }
  }
}
</script>
