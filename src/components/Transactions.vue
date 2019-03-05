<template>
    <v-card style="width: 100%;">
        <v-card-title>
            <span class="pr-3">
                Transactions for {{ months[currentMonth].name }} - {{ currentYear }}
            </span>
            <v-btn class="pr-2" flat icon v-on:click="gotoMonth(-1)">
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn class="pr-2" flat icon v-on:click="gotoCurrentMonth">
                <v-icon>today</v-icon>
            </v-btn>
            <v-btn class="pr-2" flat icon v-on:click="gotoMonth(1)">
                <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
            ></v-text-field>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:search="search"
                item-key="_id"
            >
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>
                            <v-edit-dialog
                                lazy
                            > {{ props.item.transactionDate }}
                            <v-text-field
                                slot="input"
                                label="Edit"
                                v-model="props.item.transactionDate"
                                single-line
                            ></v-text-field>
                            </v-edit-dialog>
                        </td>
                        <td class="text-xs-left">{{ props.item.transactionType }}</td>
                        <td class="text-xs-left" @click="props.expanded = !props.expanded" >
                            {{ props.item.description }}
                        </td>
                        <td class="text-xs-right">{{ props.item.charge }}</td>
                        <td class="text-xs-right">{{ props.item.deposit }}</td>
                        <td class="text-xs-right">{{ props.item.balance }}</td>
                    </tr>
                </template>

                <template slot="expand" slot-scope="props">
                    <v-card class="p1-5" flat>
                        <v-card-text class="text-xs-left">
                            <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>

                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                </template>
            </v-data-table>
        </v-card-title>
    </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
