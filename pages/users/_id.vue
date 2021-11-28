<template>
    <div>
        <h1>ユーザID: {{ user.id }}</h1>
        <h2 v-if="user">{{ user.name }}</h2>
        <ul>
            <li>{{ user.email }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    head(){
        // user名があったらタイトルをユーザー名
        if(this.user){
            return{
                title: this.user.name,
            }
        }
    },
    
    async asyncData({params}){ //Contextからparamsを取得
        const id = params.id //paramsのid取得
        const url = 'https://jsonplaceholder.typicode.com/users/' 
        return await axios.get(url + id) //idのデータ取得
        .then(res  => {
            //console.log(res.data, res.data)
            return { user: res.data }
        })
        .catch(err => {
            console.log('error')
        })
        
        /* パラメータで渡す場合
        const params = {
            url: 'https://jsonplaceholder.typicode.com/users',
            id: '',
            name: '',
            age: 1,
        }
        */
    },
    
    /*
    data(){
        return {
            // $route.param.idで_idが取得できる
            id: this.$route.params.id,
            users: [
                { 
                    id: 1, name: 'John Doe'
                },
                {
                    id: 2, name: 'Kevin Smith',
                },
                {
                    id: 3, name: 'Harry Bosch'
                },
            ],
        }
    },
    */
    computed:{
        user(){
            // idが同じならfindで配列内の最初の要素の値を返す
            return this.users.find(user => user.id == this.id)
        } 
    },

    mounted() {
      //console.log(this.$route);
    },
    
    created() {
      //console.log(this.$route);
    }


}
</script>