import Vue from 'vue'

let dtnow = new Date(Date.now())
const nowcurrentMonth = dtnow.getUTCMonth() + 1
const nowcurrentYear = dtnow.getUTCFullYear()

const state = {
  months: [
    { name: 'Zero', abrev: 'ZZZ', index: 0 },
    { name: 'January', abrev: 'Jan', index: 1 },
    { name: 'February', abrev: 'Feb', index: 2 },
    { name: 'March', abrev: 'Mar', index: 3 },
    { name: 'April', abrev: 'Apr', index: 4 },
    { name: 'May', abrev: 'May', index: 5 },
    { name: 'June', abrev: 'Jun', index: 6 },
    { name: 'July', abrev: 'Jul', index: 7 },
    { name: 'August', abrev: 'Aug', index: 8 },
    { name: 'September', abrev: 'Sep', index: 9 },
    { name: 'October', abrev: 'October', index: 10 },
    { name: 'November', abrev: 'Nov', index: 11 },
    { name: 'December', abrev: 'Dec', index: 12 }
  ],
  currentMonth: nowcurrentMonth,
  currentYear: nowcurrentYear,
  transactions: [],
  researchTypes: [],
  balanceCharges: 0,
  balanceDeposits: 0
}

const getters = {
  transactionsByMonth: state => state.transactions,
  balanceCharges: state => state.balanceCharges,
  balanceDeposits: state => state.balanceDeposits,
  researchTypes: state => state.researchTypes
}

const actions = {
  getTransactionsByMonth ({ commit, state, rootState }, payload) {
    console.log('Payload in transactionsbymonth : ', payload)

    // Make API call... Pass in selected Month and Year + UserId in hearder...
    // Once transaction data is retrieved... commit the mutation to update state...
    Vue.axios.get('/transaction/' + state.currentYear + '/' + state.currentMonth,
      { headers: { 'userId': rootState.user.userId } })
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          commit('transactionsByMonth', data)
        }
      })
      .catch((err) => {
        console.log('Darn! There was an error getting transactions by month: ' + err)
      })
  },

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
  },

  getPreviousMonthsBalances ({ commit, state, rootState }, payload) {
    commit('transactionsByMonth', [])
    console.log('Payload in balances : ', payload)
    // Make API call... Pass in selected Month and Year + UserId in hearder...
    Vue.axios.get('/transaction/balance/' + state.currentYear + '/' + state.currentMonth,
      { headers: { 'userId': rootState.user.userId } })
      .then((resp) => {
        console.log('GET transaction/balance', resp)
        let data = resp.data
        if (data && data.length > 0) {
          commit('balanceCharges', data[0].charges)
          commit('balanceDeposits', data[0].deposits)
        } else {
          commit('balanceCharges', 0)
          commit('balanceDeposits', 0)
        }
      })
      .catch((err) => {
        console.log('Darn! There was an error getting balances: ' + err)
      })
  },
  async gotoMonth ({ commit }, payload) {
    commit('gotoMonth', payload)
  },
  async gotoCurrentMonth ({ commit }) {
    commit('gotoCurrentMonth')
  },
  saveTransaction ({ commit, dispatch, state, rootState }, transaction) {
    // add the logged in userId to the transaction payload...
    transaction.userId = rootState.user.userId

    Vue.axios.post('/transaction', transaction)
      .then((resp) => {
        dispatch('getTransactionsByMonth').then(() => {
          dispatch('getPreviousMonthsBalances')
        })
      })
      .catch((err) => {
        console.log('Error saving transaction.')
        console.log(err)
      })
  }
}

const mutations = {
  transactionsByMonth (state, data) {
    // Start by clearing the array...
    state.transactions = []

    if (data && data.length > 0) {
      data.forEach(tx => {
        state.transactions.push(mapTransaction(tx, state))
      })
    }
    console.log('Transactions by month mutated: ', state.transactions)
  },
  researchTypes (state, data) {
    // Start by clearing the array...
    state.researchTypes = []

    if (data && data.length > 0) {
      data.forEach(tx => {
        state.researchTypes.push(mapResearchType(tx, state))
      })
    }
    console.log('Transactions by month mutated: ', state.transactions)
  },
  balanceCharges (state, data) {
    state.balanceCharges = data
  },
  balanceDeposits (state, data) {
    state.balanceDeposits = data
  },
  gotoMonth (state, payload) {
    console.log('gotoMonth in store call state.currentmonth: ', state.currentMonth)
    console.log('payload: ', payload)
    // tested, increment undefined. !!! result: only payload {} can carries increment here.
    let newMonth = state.currentMonth += payload.increment
    // Sanity checks now...
    if (newMonth > 12) {
      newMonth = 1
      state.currentYear += 1
    } else if (newMonth < 1) {
      newMonth = 12
      state.currentYear -= 1
    }

    state.currentMonth = newMonth
  },
  gotoCurrentMonth (state) {
    let dt = new Date(Date.now())
    state.currentMonth = dt.getUTCMonth() + 1
    state.currentYear = dt.getUTCFullYear()
  }
}

// Helper functions section ------------------------------
function mapResearchType (tx, state) {
  let researchtype = {
    _id: tx._id,
    researchType: tx.researchType
  }
  return researchtype
}
function mapTransaction (tx, state) {
  const transDate = new Date(tx.transactionDate)
  const months = state.months
  let transaction = {
    transactionDate: months[transDate.getUTCMonth() + 1].abrev + '-' + transDate.getUTCDate(),
    transactionType: tx.transactionType,
    researchType: researchFormatter(tx),
    _id: tx._id,
    description: tx.description,
    charge: moneyFormatter(tx.charge),
    deposit: moneyFormatter(tx.deposit),
    balance: moneyFormatter(calcRunningBalance(tx, state)),
    notes: tx.notes
  }
  return transaction
}

function researchFormatter (tx) {
  let researchtype = ''
  if (tx.researchType != null) {
    researchtype = tx.researchType.researchType
  }
  return researchtype
}

function moneyFormatter (amount) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  })

  return formatter.format(amount)
}

function calcRunningBalance (tx, state) {
  // any new charges?
  if (tx && tx.charge > 0) {
    state.balanceCharges += tx.charge
  } else if (tx && tx.deposit > 0) {
    state.balanceDeposits += tx.deposit
  }

  return state.balanceCharges - state.balanceDeposits
}

export default {
  state,
  getters,
  actions,
  mutations
}
