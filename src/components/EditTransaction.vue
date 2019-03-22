<template>
    <v-layout>
        <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.stop="showEditTransactionDialog"
        >
        <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title
            class="grey lighten-4 py-4 title"
            >
            Create Research Request Details
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                <v-flex xs6 align-center justify-space-between>
                <v-menu
                    ref="datePicker"
                    lazy
                    :close-on-content-click="false"
                    v-model="transactionDatePicker"
                    tansition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                    >
                    <v-text-field
                      slot="activator"
                      lable="Select Research Date"
                      v-model="transaction.transactionDate"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                        v-model="transaction.transactionDate"
                        v-on:input="$refs.datePicker.save(transaction.transactionDate)"
                    >
                    </v-date-picker>
                </v-menu>
                </v-flex>
                <v-flex xs6>
                    <!-- <v-select
                        prepend-icon="credit_card"
                        v-bind:items="transactionTypes"
                        v-model="transaction.transactionType"
                        label="Transaction Type"
                        single-line
                    ></v-select> -->
                    <v-select
                        prepend-icon="credit_card"
                        v-bind:items="researchTypes"
                        name="researchType"
                        v-model="transaction.researchType"
                        item-text="researchType"
                        item-value="_id"
                        label="Research Type"
                        single-line
                    ></v-select>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        prepend-icon="description"
                        placeholder="Description"
                        v-model="transaction.description"
                    ></v-text-field>
                </v-flex>
                <!-- <v-flex xs6>
                    <v-text-field
                        prepend-icon="remove_circle"
                        placeholder="Charge (-)"
                        v-model="transaction.charge"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        prepend-icon="add_circle"
                        placeholder="Deposit (+)"
                        v-model="transaction.deposit"
                    ></v-text-field>
                </v-flex> -->
                <v-flex xs12>
                    <v-text-field
                        prepend-icon="message"
                        placeholder="Notes"
                        v-model="transaction.notes"
                    ></v-text-field>
                </v-flex>
                <v-flex xs10 offset-(size)(0-12)="1" >
                    <v-text-field
                        prepend-icon="share"
                        placeholder="Weblinks"
                        v-for="weblink in transaction.weblinks"
                        :key="weblink.value"
                        append-outer-icon="add"
                        type="text"
                        @click:append-outer="addItem(weblink.value)"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="saveTransaction">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'


export default {
  name: 'EditTransaction',
  computed: {
    ...mapGetters({
      researchTypes: 'researchTypes'
    }),
  },
  data: () => ({
    dialog: false,
    transaction: {
      id: null,
      transactionDate: null,
      transactionType: null,
      researchType: null,
      description: '',
      notes: '',
      charge: 0.0,
      deposit: 0.0,
      weblinks: [
            {
            "value": "  "
            }
      ]
    },
    transactionTypes: [
      { text: 'Credit card', value: 'Credit card' },
      { text: 'Debit card', value: 'Debit card' },
      { text: 'Check', value: 'Check' },
      { text: 'Deposit', value: 'Deposit' }
    ],
    transactionDatePicker: false,
    emptyitem: 0
  }),
  methods: {
    addItem: function ( item ){
      // TODO: add weblink
      console.log('you click me to add weblink. ', item)
      this.emptyitem += 1
      this.transaction.weblinks.push({ "value" : ""})
    },

    removeItem: function (){
      // TODO
    },
    saveTransaction: function () {
      console.log('Saving transaction record:')
      // TODO: wire up Vuex action
      this.$store.dispatch('saveTransaction', this.transaction)

      this.dialog = false
    },
    showEditTransactionDialog: function () {
      this.transaction.transactionDate = this.getCurrentDate()
      this.dialog = true
    },
    getCurrentDate: function () {
      const dt = new Date(Date.now())
      let month = '' + (dt.getMonth() + 1)
      let day = '' + (dt.getDate())
      console.log('day: ', dt)
      let year = dt.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    getResearchTypes: function () {
      this.$store.dispatch('getResearchTypes')}
  },
  mounted: async function () {
    await this.getResearchTypes()

  }
}
</script>

<style>
.v-text-field {
    padding-top: 2px;
    margin-top: 1px;
}
</style>
