import Vue from 'vue'

const state = {
  researchTypes: []
}

const getters = {
  researchTypes: state => state.researchTypes
}

const actions = {
  getResearchTypes ({ commit, state, rootState }, payload) {
    console.log('Payload in researchTypes : ', payload)
    // Make API call... Pass in selected Month and Year + UserId in hearder...
    // Once transaction data is retrieved... commit the mutation to update state...
    Vue.axios.get('/researchtypes/')
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          commit('researchTypes', data)
        }
      })
      .catch((err) => {
        console.log('Darn! There was an error getting researchtypes: ' + err)
      })
  }

}

const mutations = {
  researchTypes (state, data) {
    // Start by clearing the array...
    state.researchTypes = []
    if (data && data.length > 0) {
      data.forEach(tx => {
        state.researchTypes.push(mapResearchType(tx, state))
      })
    }
    console.log('researchtypes mutated: ', state.researchTypes)
  }
}

function mapResearchType (tx, state) {
  let researchtype = {
    _id: tx._id,
    researchType: tx.researchType
  }
  return researchtype
}

export default {
  state,
  getters,
  actions,
  mutations
}
