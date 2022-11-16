<template>
    <div>
        <h4>Spot Balances</h4>
        <table>
            <thead>
            <tr>
                <th>Coin</th>
                <th>Balance</th>
                <th class="no-mobile">Orders</th>
                <th>Available</th>
            </tr>
            </thead>
            <tbody>
            <template inline-template>
                <tr v-for="wallet in walletsBalances"
                    :key="wallet.currency"
                >
                    <td>{{ wallet.alias }}</td>
                    <td>{{ wallet.balance.toFixed(wallet.precision) }}</td>
                    <td class="no-mobile">{{ wallet.orders.toFixed(wallet.precision) }}</td>
                    <td>{{ wallet.available.toFixed(wallet.precision) }}</td>
                </tr>
            </template>
            </tbody>
        </table>
        <h4>Margin Balances</h4>
        <table>
            <thead>
            <tr>
                <th>Coin</th>
                <th>Balance</th>
                <th class="no-mobile">Margin</th>
                <th>Available</th>
            </tr>
            </thead>
            <tbody>
            <template inline-template>
                <tr v-for="wallet in marginBalances"
                    :key="wallet.currency"
                >
                    <td>{{ wallet.alias }}</td>
                    <td>{{ wallet.balance.toFixed(wallet.precision) }}</td>
                    <td class="no-mobile">{{ wallet.margin.toFixed(wallet.precision) }}</td>
                    <td>{{ wallet.available.toFixed(wallet.precision) }}</td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Balances",
        computed: {
            ...mapGetters(['currencies', 'orders', 'markets', 'wallets', 'marginAccounts', 'marginOrders', 'marginPositions']),
            walletsBalances() {
                let wallet = {}

                for(let i in this.currencies) {
                    let currency = this.currencies[i]

                    if (!this.wallets[currency.currency]) {
                        continue
                    }

                    wallet[currency.currency] = {
                        currency: currency.currency,
                        alias: currency.alias,
                        precision: this.wallets[currency.currency] !== undefined ? this.wallets[currency.currency].precision : currency.precision,
                        balance: this.wallets[currency.currency] !== undefined ? this.wallets[currency.currency].balance : 0,
                        orders: 0,
                        available: this.wallets[currency.currency] !== undefined ? this.wallets[currency.currency].balance : 0
                    }
                }

                for(let i in this.orders) {
                    let order = this.orders[i],
                        cur = order.side ? this.markets[order.symbol].base_currency : this.markets[order.symbol].foreign_currency,
                        qty = (order.side ? order.price : 1) * (order.quantity - order.quantity_filled)

                        wallet[cur].orders += qty
                        wallet[cur].available -= qty
                }

                return wallet
            },
            marginBalances() {
                let wallet = {}

                for(let i in this.marginAccounts) {
                    let currency = this.currencies[this.marginAccounts[i].currency]

                    if (!currency) {
                        continue
                    }

                    let margin = {
                        margin: 0,
                        marginLevel: 0,
                        equity: this.marginAccounts[i].balance,
                        balance: this.marginAccounts[i].balance
                    }

                    for(let i in this.marginOrders) {
                        margin.margin +=  this.marginOrders[i].margin
                    }

                    for(let i in this.marginPositions) {
                        margin.margin += this.marginPositions[i].margin
                    }

                    //margin.margin /= this.marginAccounts[i].leverage
                    margin.marginLevel = margin.margin ? margin.equity * 100 / margin.margin : 0

                    wallet[currency.currency] = {
                        currency: currency.currency,
                        alias: currency.alias,
                        precision: this.wallets[currency.currency] !== undefined ? this.wallets[currency.currency].precision : currency.precision,
                        balance: this.marginAccounts[i].balance,
                        margin: margin.margin,
                        available: this.marginAccounts[i].balance - margin.margin
                    }
                }

                return wallet
            }
        }
    }
</script>

<style scoped>
    table {
        margin-bottom: 30px;
    }
</style>