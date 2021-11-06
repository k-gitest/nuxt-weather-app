<template>
    <div>
        <h1>ユーザID: {{ this.$route.params.id }}</h1>
        <h2 v-if="user">{{ user.name }}</h2>
    </div>
</template>

<script>
export default {
    head(){
        // user名があったらタイトルをユーザー名
        if(this.user){
            return{
                title: this.user.name,
            }
        }
    },
    
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