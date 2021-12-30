<template>
  <div class="container">
    <div class="row">
      <template v-for="center in centers">
      
      <div class="col-6">
      <button class="btn btn-success w-100 mb-1" @click="areaMenu(center, 0)">{{ center.name }}</button>
      </div>

      <div v-if="isActive.indexOf(center) >= 0"  class="areamodal-back" @click.self="areaMenu(center, 0)">
        <div class="container areamodal">
          
          <div class="row areamodal-content">
            <ul class="list-group list-group-horizontal row">
              <li class="col-md-6 col-lg-4 pb-1" v-for="item in center.children">
        
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
                          
                        <div class="col-12">
                          
                          <h3 class="h5">{{ class15s[class10_child].name }}</h3>
                          <ul class="list-group list-group-horizontal row">
                            <template v-for="(class15_child,child_code) in class15s[class10_child].children">
                            <li class="col-md-6 col-lg-4 p-1">
                              
                            <nuxt-link class="btn btn-success w-100" :to="`forecast/${ item }?area_detail=${class15_child}`">
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
          </div>
              
          <div @click="areaMenu(center, 0)" class="btn btn-success">閉じる</div>
        
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  head(){
    return {
      bodyAttrs: {
        class: this.isLock ? 'lock' : ''
      }
    }
  },
  data(){
    return{
      isActive:[],
      isLock:false,
    }
  },
  async fetch(){
    await this.$store.dispatch('forecast/forecastIndex')
  },
  methods:{

    areaMenu: function(item, lockNum){
      if (this.isActive.indexOf(item) >= 0) {
        this.isActive = this.isActive.filter(n => n !== item)
        if(lockNum === 0)this.isLock = false
      }else {
        this.isActive.push(item)
        if(lockNum === 0)this.isLock = true
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