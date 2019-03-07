import Vue from 'vue'

const state = {
  email: '',
  first: '',
  last: '',
  userId: null,
  isLoggedIn: false,
  loginError: ''
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
}

const actions = {
  async logInUser ({ commit }, payload) {
    await Vue.axios.get('/user/email/' + payload.email)
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          // Test password entered (payload) against user object
          if (data[0].password === payload.password) {
            const user = data[0]
            payload.userId = user._id
            payload.first = user.first
            payload.last = user.last
            payload.email = user.email
            commit('logInUser', payload)
          } else {
            commit('loginError')
          }
        }
      })
      .catch(() => {
        commit('loginError')
      })
  },
  async loadUserProfile ({ commit }) {
    // get the user object for the currently logged in user...
    await Vue.axios.get('/user/' + this.userId)
      .then((resp) => {
        let data = resp.data
        console.log('loadUserProfile data: ', data)
      })
  },
  updateUserProfile ({ commit }, payload) {
    // TODO encrypt user's password
    Vue.axios.put('/user/' + this.state.user.userId, payload)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log('Error to update user profile: ', err)
      })
  },

  logOut ({ commit, state }, payload) {
    this.state.isLoggedIn = false
    this.state.loginError = 'Thanks for using research portal. '
  }
}

const mutations = {
  logInUser (state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.userId = payload.userId
    state.last = payload.last
    state.first = payload.first
  },
  loginError (state) {
    state.isLoggedIn = false
    state.loginError = 'Email and/or Password are invalid. Login failed.'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
