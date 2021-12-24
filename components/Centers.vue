<template>
  <div class="container">
    <template v-for="center in centers">
    <h2>{{ center.name }}</h2>
    <ul class="list-group list-group-horizontal row">
      <li class="col-4 pb-1" v-for="item in center.children">

        <button class="btn btn-success w-100" @click="areaMenu(item)">{{ offices[item].name }}</button>
        
        <div v-if="isActive.indexOf(item) >= 0" class="areamodal-back" @click.self="areaMenu(item)">
          <div class="container areamodal">
            <div class="row areamodal-content">
              <div class="col-12">
              <nuxt-link :to="`forecast/${ item }`">
                    {{ offices[item].name }}全域
              </nuxt-link>
              </div>
              <template v-for="office_child in offices[item].children">
                <template v-for="class10_child in class10s[office_child].children">
                  
                <div class="col-6">
                  
                  <h3 class="h5">{{ class15s[class10_child].name }}</h3>
                  <ul class="list-group list-group-horizontal row">
                    <template v-for="(class15_child,child_code) in class15s[class10_child].children">
                    <li class="col-6">
                      
                    <nuxt-link :to="`forecast/${ item }?area_detail=${class15_child}`">
                      {{ class20s[class15_child].name }}
                    </nuxt-link><br>
                  
                    </li>
                    </template>
                  </ul>
                </div>
  
                </template>
              </template>
            </div>
            <div @click="areaMenu(item)" class="btn btn-success">閉じる</div>
          </div>
          
        </div>
        
      </li>
    </ul>
    
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  head(){
    return {
      bodyAttrs: {
        class: this.isActive ? 'lock' : ''
      }
    }
  },
  data(){
    return{
      isActive:[],
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
    },
    
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
  },

}
</script>