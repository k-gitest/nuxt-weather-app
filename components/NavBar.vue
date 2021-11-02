<template>
  <div>
    <nav>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/about" no-prefetch>About</nuxt-link>
    <nuxt-link :to="{ name: 'users-list' }">User List</nuxt-link>
    <nuxt-link to="/todo" no-prefetch>Todo</nuxt-link>
    <nuxt-link to="/storetest" no-prefetch>Store</nuxt-link>
    <nuxt-link to="/mainchart">chart</nuxt-link>
    </nav>
  </div>
</template>
