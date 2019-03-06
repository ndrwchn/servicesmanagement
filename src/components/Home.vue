<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-layout>
          <transactions></transactions>
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
  data: () => ({
    dialog: false
  }),
  methods: {

  }
}
</script>
<style>
  .v-content {
      padding-top: 10px;
  }
</style>
