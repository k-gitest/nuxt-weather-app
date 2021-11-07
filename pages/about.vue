<template>
    <div>
        <h1>About Page</h1>
        <h2>{{ subtitle }}</h2>
        
        <ul>
            <li v-for="item in items">{{ item }}</li>
        </ul>

        <ul>
            <li v-for="weather in weathers">{{ weather }}</li>
        </ul>
        <button @click="are_write(`overview_forecast/130000.json`)">東京</button>
        <button @click="are_write(`overview_forecast/140000.json`)">横浜</button>

    </div>
</template>

<script>
import axios from 'axios'

export default{
  layout: 'original',
  data(){
      return{
          subtitle: 'この文書はNuxt.jsでの気象庁のデータについて説明しています。',
          weathers: [],
          url: 'https://www.jma.go.jp/bosai/forecast/data/',
          area: 'overview_forecast/130000.json'
      }
  },

  // asyncDataではthisは不可、propsは可能
  async asyncData(){
      const url = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json'
      
      return await axios.get(url)
      .then(res => {
          //console.log(res.data)
          return {items: res.data}
          })
          
  },
  
  // fetchではthisが可能
  async fetch(){
      //const url = 'https://www.jma.go.jp/bosai/forecast/data/'
      this.weathers = await fetch(this.url + this.area).then(res => res.json())
  },
  methods: {
      are_write: async function(area){
          this.area = area
          this.weathers = await fetch(this.url + this.area).then(res => res.json())
      },
  },
  
  // headプロパティでtitleやmetaなどを設定できる
  head(){
      return{
          title: 'Aboutのページ',
          meta:[
              {
                  hid: 'description',
                  name: 'description',
                  content: 'Aboutページ説明です'
              }
              ]
      }
  },
  
  

  
}
</script>