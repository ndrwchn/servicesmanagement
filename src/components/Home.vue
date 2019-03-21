<template>
  <div>
    <navigation-drawer>
    </navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-layout>
            <transactions v-if="this.$store.getters.isLoggedIn"></transactions>
        </v-layout>
      </v-container>
    </v-content>
    <edit-transaction></edit-transaction>
  </div>
</template>

<script>
import Transactions from './Transactions.vue'
import EditTransaction from './EditTransaction.vue'
import NavigationDrawer from './NavigationDrawer.vue'

export default {
  name: 'Home',
  components: {
    Transactions,
    EditTransaction,
    NavigationDrawer
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    menuAction: function () {
      // TODO
    },
    showProfile: function () {
      console.log('show profile clicked!')
    }
  },
  mounted: function () {
    console.log('Is user logged in? ', this.isLoggedIn)
    if (!this.isLoggedIn) {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
