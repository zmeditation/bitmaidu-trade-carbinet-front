<template>
    <div>
        <h4>Referrals</h4>
        <table>
            <thead>
            <tr>
                <th class="no-mobile">ID</th>
                <th>Name</th>
                <th class="no-mobile">Registered</th>
                <th>Level</th>
                <th>Payout</th>
            </tr>
            </thead>
            <tbody>
                <template inline-template>
                    <tr v-for="referral in mlmReferrals"
                        v-bind:key="referral.id"
                        >
                        <td class="no-mobile">{{referral.id}}</td>
                        <td>{{referral.fullname}}</td>
                        <td class="no-mobile">{{referral.timeCreatedString}}</td>
                        <td>{{referral.level}}</td>
                        <td>{{ (100 * referral.payout)+'%'}}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "MLMReferralsTable",
        computed: {
            ...mapGetters(['mlmReferrals'])
        }
    }
</script>

<style scoped>
    td, th {
        text-align: center;
        padding: 6px;
    }
</style>
