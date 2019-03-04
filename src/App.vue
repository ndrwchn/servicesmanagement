<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}

</script>

<style>
/* @import 'vuetify/disk/vuetify.min.css';
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'; */
@import 'vuetify/disk/vuetify.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
