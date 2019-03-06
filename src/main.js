import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'

// Vuex store
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
