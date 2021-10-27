<template>
    <div>
        <h1>ユーザID: {{ this.$route.params.id }}</h1>
        <h2>{{ user.name }}</h2>
    </div>
</template>

<script>
export default {
    data(){
        return {
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
            return this.users.find(user => user.id == this.id);
        } 
    },
    
    mounted() {
      console.log(this.$route);
    },
    
    created() {
      console.log(this.$route);
    }


}
</script>