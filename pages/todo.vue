<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <div class="pb-3">
        <input type="text" name="addName" v-model="content" placeholder="タスクを入力してください">
        <button class="btn btn-success" @click="insert">追加</button>
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
      find_state: '',
      find_flg: false
    }
  },
  computed: {
    ...mapState(['todos']),
    display_todos: function(){
        if(this.find_flg){
            let arr = []
            let data = this.todos
            data.forEach(element => {
                if(element.state == this.find_state){
                    arr.push(element)
                }
            })
            return arr
        } else {
            return this.todos
        }
    }
  },
  methods: {
      insert: function() {
        if(this.content != ''){
          this.$store.commit('insert', {content: this.content})
          this.content = ''
        }
      },
      remove: function(todo) {
          this.$store.commit('remove', todo)
      },
      changeState: function(todo){
          this.$store.commit('changeState', todo)
      },
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