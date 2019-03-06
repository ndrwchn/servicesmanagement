import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuex store
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8080/api'
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
