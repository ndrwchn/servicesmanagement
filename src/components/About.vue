<template>
<v-content>
    <navigation-drawer></navigation-drawer>
    <v-layout>
        <v-container>
                <p> {{ message }} </p>
        </v-container>
    </v-layout>

</v-content>
</template>

<script>
import NavigationDrawer from './NavigationDrawer.vue'

export default {
  name: 'About',
  components: {
    NavigationDrawer
  },
  computed: {
    // isLoggedIn () {
    //   let isloggedin = this.$store.getters.isLoggedIn
    //   console.log('about page login: ', isloggedin)
    //   return this.$store.getters.isLoggedIn
    // }
  },
  data: () => ({
    message: 'About page Airbnb maintains a very popular JavaScript Style Guide that is used by many JavaScript developers worldwide. Following this style guide will ensure your code has a level of clarity that makes reading and maintaining your code easier for anyone who has to work on it.ESLint is a tool for “linting” your code. It can analyze your code and warn you of potential errors. In order for it to work, you need to configure it with specific rules. Luckily, Airbnb — as part of their style guide — provides an ESLint configuration that anyone can use.VS Code is a popular code editor created by Microsoft. One of the nice features is that you can enabled extensions that make your life as a developer easier. There is an extension for ESLint which will integrate it’s linting features right in your editor. You will be warned of potential problems on the fly as you write code.Many developers consider setting up linting in this way essential. In this post, I’ll show you how to set it all up.'

  }),

  mounted: function () {
    // console.log('Is user logged in? ', this.isLoggedIn)
    // if (!this.isLoggedIn) {
    //   this.$router.push({ path: '/login', query: { redirect: '/about' } })
    // }
  }

}
</script>

<style scoped>
.v-content {
   padding-top: 10px;
}
</style>
