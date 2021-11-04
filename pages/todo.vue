<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <div class="pb-3">
        <input type="text" name="addName" v-model="content" placeholder="タスクを入力してください">
        <button class="btn btn-success" @click="insert">追加</button>
    </div>
    <div v-if="errors.length">
    <ul>
      <li v-for="error in errors" class="text-danger">{{ error }}</li>
    </ul>
    </div>
    <div class="pb-3">
        <button class="btn btn-primary" v-bind:class="{'is-active':(!find_flg)}" @click="flag_reset">全て</button>
        <button class="btn btn-primary" v-bind:class="{'is-active':find_flg && (find_state == '作業前')}" @click="find('作業前')">作業前</button>
        <button class="btn btn-primary" v-bind:class="{'is-active':find_flg && (find_state == '作業中')}" @click="find('作業中')">作業中</button>
        <button class="btn btn-primary" v-bind:class="{'is-active':find_flg && (find_state == '完了')}" @click="find('完了')">完了</button>
    </div>
    <table class="table table-striped">
      <thead class="table-light">
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in display_todos" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
              <button class="btn btn-outline-primary"
                      v-bind:class="{
                        'btn-outline-primary':item.state == '作業前',
                        'btn-outline-primary':item.state == '作業中',
                        'btn-outline-success':item.state == '完了'}"
                      @click="changeState(item)">
                {{ item.state }}
              </button>
          </td>
          <td><button class="btn btn-danger" @click="remove(item)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head: {
    // 外部css設定
    link:[
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
            integrity: 'sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1',
            crossorigin: 'anonymous'
        }
        ]  
  },
    
  data() {
    return {
      content: '',
      // 絞込み判定用
      find_state: '', 
      find_flg: false, // 初期値はfalseで一覧表示
      
      errors: [],
    }
  },
  computed: {
    // store使用
    // stateをmapingで呼び出す
    ...mapState(['todos']),
    
    // data表示
    display_todos: function(){
        if(this.find_flg){
            let arr = []
            let data = this.todos
            data.forEach(element => {
                // todosデータとボタンのfind_stateを照合
                if(element.state == this.find_state){
                    // 合致したらarrに追加
                    arr.push(element)
                }
            })
            return arr
        } else {
            // 一覧表示
            return this.todos
        }
    }
  },
  methods: {
      // 追加
      insert: function() {
        this.errors = [] //エラー初期化
        
        if(this.content != ''){
          this.$store.commit('insert', {content: this.content})
          this.content = ''
        } else {
            // error処理
            this.errors.push('タスクを入力してください')
        }
      },
      // 削除
      remove: function(todo) {
          this.$store.commit('remove', todo)
      },
      // 状態変化
      changeState: function(todo){
          this.$store.commit('changeState', todo)
      },
      
      //絞込み判定用
      find: function(find_state){
          this.find_state = find_state
          this.find_flg = true
      },
      flag_reset: function(){
          this.find_flg = false
      }
  },
  
}
</script>
<style>

</style>