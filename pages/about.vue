<template>
    <div>
        <h1>About Page</h1>
        <h2>{{ subtitle }}</h2>
    </div>
</template>

<script>
export default{
  layout: 'original',
  
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
  
  data(){
      return{
          subtitle: 'この文書はNuxt.jsの基本的な使用方法について説明しています。'
      }
  },
}
</script>