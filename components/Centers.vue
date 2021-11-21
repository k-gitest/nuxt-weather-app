<template>
  <div>
    <template v-for="center in centers">
    <ul>
      <li>{{ center.name }}</li>
      <li>{{ center.officeName }}</li>
      <li v-for="item in center.children">
        <nuxt-link :to="`forecast/${ item }`">
          {{ offices[item].name }}:{{ offices[item].officeName }}<br>
          <template v-for="office_child in offices[item].children">
            parent:{{ class10s[office_child].parent}}<br>
            {{ class10s[office_child].name }}:{{ class10s[office_child].children}}<br>
            
            <template v-for="class10_child in class10s[office_child].children">
              parent:{{ class15s[class10_child].parent}}<br>
              {{ class15s[class10_child].name }}:{{ class15s[class10_child].children}}<br>
              
              <template v-for="class15_child in class15s[class10_child].children">
                {{ class20s[class15_child].parent }}<br>
                {{ class20s[class15_child].name }}:{{ class20s[class15_child].children }}<br>
              </template>
            </template>
          </template>
        </nuxt-link>
      </li>
    </ul>
    </template>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  async fetch(){
    await this.$store.dispatch('forecast/forecastIndex')
  },
  computed:{
    centers: function(){
      return this.$store.getters['forecast/centers']
    },
    offices: function(){
      return this.$store.getters['forecast/offices']
    },
    class10s: function(){
      return this.$store.getters['forecast/class10s']
    },
    class15s: function(){
      return this.$store.getters['forecast/class15s']
    },
    class20s: function(){
      return this.$store.getters['forecast/class20s']
    }
    /*
    centers: function(){
      return this.$store.state.forecast.centers
    }
    */
  },

}
</script>