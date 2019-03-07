<template>
  <v-container>
        <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="">SLS Research Portal</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Login to SLS Research Portal</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 offset-sm3>
      <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 7 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm5>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary blue" :disabled ="!isShowing" v-on:click="login">Login</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar
        :timeout="6000"
        :top="true"
        v-model="showAlert">
        {{ loginError }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      showAlert: false,
      isShowing: false,
      show1: false,
      email: '',
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 7 || 'Min 7 Characters.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const emailvalidated = pattern.test(value)
          if (emailvalidated) {
            this.isShowing = true
          } else {
            this.isShowing = false
          }
          console.log('emailvalidation: ', emailvalidated)
          return emailvalidated || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    loginError () {
      return this.$store.getters.loginError
    }
  },
  methods: {
    login: function () {
      const vm = this
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('logInUser', payload)
        .then(() => {
          if (vm.isLoggedIn) {
            this.$router.push({ path: '/' })
          } else {
            vm.showAlert = true
          }
        })
    },
    cancel: function () {
      console.log('The user does not want to login')
    }
  }
}
</script>

<style>
</style>
