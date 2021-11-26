<template>
  <div>
    <template v-for="center in centers">
    <ul>
      <li>{{ center.name }}</li>
      <li>{{ center.officeName }}</li>
      <li v-for="item in center.children">
        
        <nuxt-link :to="`forecast/${ item }`">
          {{ offices[item].name }}:{{ offices[item].officeName }}
          
          <!--
          <template v-for="office_child in offices[item].children">
            id:{{office_child}}<br>
            class10sparent:{{ class10s[office_child].parent}}<br>
            {{ class10s[office_child].name }}:{{ class10s[office_child].children}}<br>
            
            
            <template v-for="class10_child in class10s[office_child].children">
              id:{{class10_child}}<br>
              class15sparent:{{ class15s[class10_child].parent}}<br>
              {{ class15s[class10_child].name }}:{{ class15s[class10_child].children}}<br>
              
              
              <template v-for="class15_child in class15s[class10_child].children">
                id:{{class15_child}}<br>
                class20sparent:{{ class20s[class15_child].parent }}<br>
                {{ class20s[class15_child].name }}:{{ class20s[class15_child].children }}<br>
              </template>
              
            </template>

          </template>
          -->
        </nuxt-link><br>

        <button class="btn btn-success" @click="areaMenu(item)">ボタン</button>
        <div v-if="isActive.indexOf(item) >= 0">
          <template v-for="office_child in offices[item].children">
            <template v-for="class10_child in class10s[office_child].children">
              <h3 class="h4">{{ class15s[class10_child].name }}</h3>
              <template v-for="class15_child in class15s[class10_child].children">
                <nuxt-link :to="`forecast/${ item }?area_detail=${class15s[class10_child].parent}`">
                  {{ class20s[class15_child].name }}
                </nuxt-link><br>
              </template>
            </template>
          </template>
        </div>
      </li>
    </ul>
    </template>
  </div>
</template>
<style>
  .areamodal{
    display:none;
  }
</style>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      isActive:[],
      //area: '',
      //areaDetail:''
    }
  },
  async fetch(){
    await this.$store.dispatch('forecast/forecastIndex')
  },
  methods:{

    areaMenu: function(item){
      if (this.isActive.indexOf(item) >= 0) {
        this.isActive = this.isActive.filter(n => n !== item)
      }else {
        this.isActive.push(item)
      }
      
      /*
      this.offices[item].children.filter(f=>{
        this.area = this.class10s[f].children.map(m=>{
          this.areaMenuDetail(this.class15s[m].children)
          return this.class15s[m].name
          
        })
        
      })
      */
    },
    areaMenuDetail:function(item){
      this.areaDetail = item.map(f=>{return this.class20s[f].name})
    }
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