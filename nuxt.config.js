export default {
  // グローバルページヘッダー
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // グローバルCSS
  css: [
  ],

  // ページをレンダリングする前に実行するプラグイン
  plugins: [
    { src: '@/plugins/vue-chartjs.js', ssr:true },
  ],

  // コンポーネントの自動インポート
  components: true,

  // 開発およびビルド用のモジュール（推奨）
  buildModules: [
  ],

  // モジュール
  modules: [
      "@nuxtjs/axios",
  ],

  // ビルド構成
  build: {
    // dart-sass設定
    loaders: {
      scss: {
        implementation: require('sass'),
        sassOptions: {
          fiber: require('fibers'),
        },
      },
    },
  },
  
  //モード切替　
  //mode:universalは非推奨、SSRのbooleanで設定する、spaはSSRではない
  ssr: 'true',
  //SSGの場合はtargetも設定する
  //target: 'static',
  
  //loadingコンポーネント
  loading: '@/components/Loading.vue',
  
}
