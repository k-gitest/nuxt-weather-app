<template>
    <div>
    <h1>ユーザ一覧</h1>
    
    <ul>
        <li v-for="user in users">
            <nuxt-link :to="`/users/${user.id}`">{{ user.name }}</nuxt-link>
        </li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    // asyncDataでコンポーネントにデータを直接セット
    // fetchはstoreにデータをセット
    async asyncData(){
        
        const url = 'https://jsonplaceholder.typicode.com/users'
        return await axios.get(url)
        .then(res  => {
            //console.log(res.data, res.data)
            return { users: res.data }
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
    }

}

</script>