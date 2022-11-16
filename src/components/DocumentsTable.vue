<template>
    <div>
        <h4>Uploaded Documents</h4>
        <table>
            <thead>
            <tr>
                <th>Type</th>
                <th>Time Uploaded</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <template inline-template>
                <tr v-for="document in documents"
                    v-bind:key="document.id"
                >
                    <td>{{ (['Proof of Id', 'Proof of Address'])[document.type]}}</td>
                    <td>{{document.timeCreatedString}}</td>
                    <td v-bind:class="document.status == 1 ? 'green' : (document.status == 2 ? 'red' : '')">{{ (['Pending', 'Processed', 'Declined', 'Being Processed'])[document.status]}}</td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "DocumentsTable",
        computed: {
            ...mapGetters(['documents'])
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
    }

    td, th {
        text-align: center;
        padding: 6px;
    }
</style>
