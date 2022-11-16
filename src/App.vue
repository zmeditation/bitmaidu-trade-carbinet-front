<template>
    <div id="app">
        <div class="header">
            <h5>Client Area</h5>
            <div class="menu">
                <span class="btn btn-primary" v-on:click="goMargin"><i class="material-icons">stacked_line_chart</i> Margin Trading</span>
                <span class="btn btn-primary" v-on:click="goSpot"><i class="material-icons">account_balance</i> Spot Trading</span>
            </div>
        </div>
        <div class="body">
            <div class="cabinet-tabs">
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'profile'}"
                     v-on:click="current = 'profile'"
                >
                    <span>Profile</span>
                    <i class="material-icons">settings</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'balances'}"
                     v-on:click="current = 'balances'"
                >
                    <span>Balances</span>
                    <i class="material-icons">toll</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'deposit'}"
                     v-on:click="current = 'deposit'"
                >
                    <span>Deposit</span>
                    <i class="material-icons">account_balance_wallet</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'withdrawal'}"
                     v-on:click="current = 'withdrawal'"
                >
                    <span>Withdrawals</span>
                    <i class="material-icons">payment</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'verification'}"
                     v-on:click="current = 'verification'"
                >
                    <span>Verification</span>
                    <i class="material-icons">security</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'mlm'}"
                     v-on:click="current = 'mlm'"
                >
                    <span>Refer a Friend</span>
                    <i class="material-icons">supervisor_account</i>
                </div>
                <div class="cabinet-tab"
                     v-bind:class="{active: current === 'api'}"
                     v-on:click="current = 'api'"
                >
                    <span>API</span>
                    <i class="material-icons">settings_input_component</i>
                </div>
            </div>
            <div class="content">
                <Profile v-bind:class="{hide: current !== 'profile'}"></Profile>
                <Balances v-bind:class="{hide: current !== 'balances'}"></Balances>
                <Deposit v-bind:class="{hide: current !== 'deposit'}"></Deposit>
                <DepositsTable v-bind:class="{hide: current !== 'deposit'}"></DepositsTable>
                <Withdrawal v-bind:class="{hide: current !== 'withdrawal'}"></Withdrawal>
                <WithdrawalsTable v-bind:class="{hide: current !== 'withdrawal'}"></WithdrawalsTable>
                <Verification v-bind:class="{hide: current !== 'verification'}"></Verification>
                <DocumentsTable v-bind:class="{hide: current !== 'verification'}"></DocumentsTable>
                <MLM v-bind:class="{hide: current !== 'mlm'}"></MLM>
                <MLMReferralsTable v-bind:class="{hide: current !== 'mlm'}"></MLMReferralsTable>
                <MLMPayoutsTable v-bind:class="{hide: current !== 'mlm'}"></MLMPayoutsTable>
                <API v-bind:class="{hide: current !== 'api'}"></API>
            </div>
        </div>
        <Login></Login>
        <Register/>
    </div>
</template>

<script>
    import Profile from "@/components/Profile";
    import Balances from "@/components/Balances";
    import DepositsTable from "@/components/DepositsTable";
    import Deposit from "@/components/Deposit";
    import Withdrawal from "@/components/Withdrawal";
    import WithdrawalsTable from "@/components/WithdrawalsTable";
    import {
        API_KEYS_GET,
        APP_INIT,
        DEPOSITS_GET,
        DOCUMENTS_GET,
        MLM_PAYOUTS_GET, MLM_REFERRALS_GET,
        WITHDRAWALS_GET
    } from "@/store/actions.type";
    import Login from "@/components/Login";
    import Verification from "@/components/Verification";
    import DocumentsTable from "@/components/DocumentsTable";
    import API from "@/components/API";
    import {CRYPTO_API_KEY_NEW} from "@/store/mutations.type";
    import MLM from "@/components/MLM";
    import MLMPayoutsTable from "@/components/MLMPayoutsTable";
    import Register from "@/components/Register";
    import MLMReferralsTable from "@/components/MLMReferralsTable";

    export default {
        name: 'App',
        mounted() {
            this.$store.dispatch(APP_INIT)
        },
        data() {
            return {
                current: 'profile'
            }
        },
        methods: {
            goMargin() {
                window.location = '/margin'
            },
            goSpot() {
                window.location = '/spot'
            }
        },
        components: {
            MLMReferralsTable,
            Register,
            MLMPayoutsTable,
            MLM,
            API,
            DocumentsTable,
            Verification,
            Login,
            WithdrawalsTable,
            Withdrawal,
            Deposit,
            DepositsTable,
            Balances,
            Profile

        },
        watch: {
            current(val) {
                switch (val) {
                    case 'deposit':
                        this.$store.dispatch(DEPOSITS_GET)
                        break
                    case 'withdrawal':
                        this.$store.dispatch(WITHDRAWALS_GET)
                        break
                    case 'verification':
                        this.$store.dispatch(DOCUMENTS_GET)
                        break
                    case 'api':
                        this.$store.dispatch(API_KEYS_GET)
                        this.$store.commit(CRYPTO_API_KEY_NEW, '')
                        break
                    case 'mlm':
                        this.$store.dispatch(MLM_PAYOUTS_GET)
                        this.$store.dispatch(MLM_REFERRALS_GET)
                        break
                }
            }
        }
    }
</script>

<style>
:root {
    --background: #131722;
    --background-dark: #000;
    --font: #eeeeee;
    --brand: #10d876;
    --green: #409789;
    --red: #bd7064;
    --green-bright: #00ff00;
    --red-bright: #ff0000;
    --primary-button: #10d876;
    --secondary-button: #6c757d;
    --even: #1c1c1c;
    --odd: #202020;
    --border: #2d2d2d;
}

*, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

*:focus {
    outline: none !important;
}

::-webkit-scrollbar {
    width: 1px;
    height: 0px;
}

::-webkit-scrollbar-track {
    background: var(--background-dark);
}

::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover {
    background: var(--brand);
}

::-webkit-scrollbar-corner {
    background: rgba(0,0,0,0);
}

html, body {
    min-height: 100%;
    width: 100%;
    color: var(--font);
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 13px;
    font-weight: 300;
    background-color: var(--background-dark);
    overflow-x: hidden;
    display: flex;
    justify-content: center;
}

h5 {
    font-size: 1.2em;
    font-weight: 300;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

input, select {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--font);
    background-color: var(--background-dark);
    background-clip: padding-box;
    border: 1px solid var(--background-dark);
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0
}

td, th {
    padding: 0.5em;
}

th {
    text-align: left;
}

#app {
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 15px;
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 -20px;
}

.flex-col {
    display: flex;
    flex-direction: column;
    padding: 0 20px
}

.space-between {
    justify-content: space-between;
}

.green {
    color: var(--green);
}

.red {
    color: var(--red);
}

.grey {
    color: var(--secondary-button)
}

.pointer {
    cursor: pointer;
}

.pad {
    margin: 0 5px;
}

.hide {
    display: none !important;
}

.scroll {
    overflow: scroll;
}

.btn {
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0.15em 0.6em;
    border: 1px solid transparent;
    font-size: 0.9em;
    line-height: 1.5;
    border-radius: 0.25em;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.btn-primary {
    color: var(--font);
    background-color: transparent;
    border-color: var(--primary-button);
}

.btn-primary:hover {
    background-color: var(--primary-button);
}

.btn-secondary {
    background-color: transparent;
    color: var(--font);
    border-color: var(--secondary-button);
}

.btn-secondary:hover {
    background-color: var(--secondary-button);
}

.btn-transparent {
    background-color: transparent;
    border-color: var(--primary-button);
    color: var(--font)
}

.btn-transparent:hover {
    background-color: var(--primary-button);
    color: var(--font)
}

.btn-disabled {
    background-color: transparent;
    color: var(--secondary-button);
    border-color: var(--secondary-button);
}

.btn-red {
    background-color: var(--red-bright);
    color: var(--font);
    border-color: var(--red-bright);
}

h5 .material-icons {
    font-size: 1.5em;
    margin: 0
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--background-dark);
    border-bottom: 1px solid var(--brand);
    padding: 15px 0;
}

.header h5 {
    margin-bottom: 0;
}

.header .menu {
    display: flex;
    align-items: center;
}

.header .btn {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
}

.header i {
    margin-right: 10px;
}

.body {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-top: 15px solid var(--background-dark);
    border-bottom: 15px solid var(--background-dark);
    flex: 1 1 auto;
}

.footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    border: 1px solid var(--border);
    border-top: none;
}

label {
    margin-bottom: 10px;
    display: block;
    width: 100%;
}

h4 {
    font-size: 1.4em;
    font-weight: 400;
    margin: 15px 0
}

th {
    background-color: rgba(0,0,0,0.5);
}

.close {
    color: var(--secondary-button);
    font-size: 1.3em;
    cursor: pointer;
}

.form-row {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
}

@media (max-width: 767px) {
    .body {
        flex-direction: column !important;
    }

    .two-cols {
        flex-direction: column !important;
    }

    .onecol {
        padding-right: 0 !important;
    }

    .extra-text {
        display: none !important;
    }

    .content {
        padding: 10px !important;
    }

    h4 {
        padding: 0 15px !important;
    }

    .no-mobile {
        display: none !important;
    }
}

.body {
    flex-direction: row;
}

.cabinet-tabs {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    flex: 1 1 20%;
    background-color: var(--background-dark);
}

.cabinet-tab {
    padding: 20px;
    cursor: pointer;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
}

.cabinet-tab.active, .cabinet-tab:hover {
    background-color: var(--background);
}

.content {
    flex: 4 1 80%;
    background-color: var(--background);
    padding: 1rem 2rem;
}

.material-icons.large {
    font-size: 4em;
    width: 100%;
    margin: 0 0 10px;
}

.text {
    font-size: 1em;
    line-height: 1.5em;
}

.text-muted {
    margin-top: 5px;
    font-size: 0.9em;
    font-style: italic;
    display: block
}

.support-email {
    text-decoration: underline;
    color: var(--font)
}

.subaction {
    border-bottom: 1px dotted;
    cursor: pointer;
}

.form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
}

.form-actions .btn {
    padding: 0.375rem 0.75rem;
    font-weight: 400;
    font-size: 1em;
}

.two-cols {
    display: flex;
}

.onecol {
    display: flex;
    flex: 1 1;
    flex-direction: column;
    padding-right: 30px;
}

.onecol:last-child {
    padding-right: 0;
}

.modal-wrapper {
    position: fixed;
    z-index: 1080;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
}

.modal {
    width: 300px;
    display: flex;
    flex-direction: column;
    background: var(--background);
}

.modal-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--border);
    border-bottom: 1px solid var(--brand);
    padding: 15px;
}

.modal-header h5 {
    margin-bottom: 0;
}

.modal-body {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-top: 15px solid var(--background);
    border-bottom: 15px solid var(--background);
    flex: 1 1 auto;
    border-bottom: none;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    border: 1px solid var(--border);
    border-top: none;
}

.modal label {
    margin-bottom: 10px;
    display: block;
    width: 100%;
}

.modal h4 {
    font-size: 1.4em;
    font-weight: 400;
    margin: 15px 0
}

.modal th {
    background-color: rgba(0,0,0,0.3);
}

.modal .close {
    color: var(--secondary-button);
    font-size: 1.3em;
    cursor: pointer;
}
</style>
