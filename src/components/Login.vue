<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Login to SLS CMM</h2>
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
      <v-flex xs12 sm6 offset-sm3>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary blue" v-on:click="login">Login</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar
        :timeout="6000"
        :top="true"
        v-model="showAlert">
        {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      showAlert: false,
      show1: false,
      message: '',
      email: '',
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 7 || 'Min 7 Characters.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    login: function () {
      const vm = this
      if (vm.password === 'test111') {
        this.$router.push({ path: '/' })
      } else {
        // show alert to user
        vm.showAlert = true
        vm.message = 'email or password is invalid!'
      }
    },
    cancel: function () {
      console.log('The user does not want to login')
    }
  }
}
</script>

<style>
</style>
