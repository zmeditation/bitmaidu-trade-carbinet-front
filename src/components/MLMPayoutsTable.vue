<template>
    <div>
        <h4>Payouts history</h4>
        <table>
            <thead>
            <tr>
                <th class="no-mobile">ID</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Currency</th>
                <th class="no-mobile">Info</th>
            </tr>
            </thead>
            <tbody>
                <template inline-template>
                    <tr v-for="transaction in mlmPayouts"
                        v-bind:key="transaction.id"
                        >
                        <td class="no-mobile">{{transaction.id}}</td>
                        <td>{{transaction.timeCreatedString}}</td>
                        <td>{{transaction.amount.toFixed(account.precision)}}</td>
                        <td>{{transaction.currency}}</td>
                        <td class="no-mobile">{{transaction.info}}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "MLMPayoutsTable",
        computed: {
            ...mapGetters(['mlmPayouts', 'account'])
        }
    }
</script>

<style scoped>
    td, th {
        text-align: center;
        padding: 6px;
    }
</style>
