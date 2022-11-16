import Vue from 'vue';
import {
    ACCOUNT, BALANCE_UPDATE,
    LOGOUT, MARGIN_ACCOUNT, MARGIN_ORDER, MARGIN_POSITION,
    ORDER,
    USER
} from "@/store/mutations.type";
import RestService from "@/common/rest.service";
import {ORDER_REQUEST} from "@/store/actions.type";

const state = {
    accounts: {},
    marginAccounts: {},
    wallets: {},
    orders: {},
    marginOrders: {},
    marginPositions: {}
}

const getters = {
    accounts() {
        return state.accounts
    },

    orders() {
        return state.orders
    },

    marginAccounts() {
        return state.marginAccounts
    },

    marginOrders() {
        return state.marginOrders
    },

    marginPositions() {
        return state.marginPositions
    },

    wallets() {
        return state.wallets
    }
}

const actions = {
    [ORDER_REQUEST](context, order) {
        order.account_id = state.account.id
        RestService.post('/crypto/'+state.account.id+'/orders', order)
    }
}

const mutations = {
    [USER]() {
        RestService.get('/crypto/accounts')
            .then(accounts => {
                for(let i in accounts) {
                    this.commit(ACCOUNT, accounts[i])
                }
            })

        RestService.get('/crypto_margin/accounts')
            .then(accounts => {
                for(let i in accounts) {
                    this.commit(MARGIN_ACCOUNT, accounts[i])
                }
            })
    },

    [ACCOUNT](context, account) {
        Vue.set(state.accounts, account.id, account)

        for(let cur in account.wallets) {
            Vue.set(state.wallets, cur, account.wallets[cur])
        }

        RestService.get('/crypto/'+account.id+'/orders')
            .then(orders => {
                for(let i in orders) {
                    this.commit(ORDER, orders[i])
                }
            })
    },

    [MARGIN_ACCOUNT](context, account) {
        Vue.set(state.marginAccounts, account.id, account)

        RestService.get('/crypto_margin/'+account.id+'/orders')
            .then(orders => {
                for(let i in orders) {
                    this.commit(MARGIN_ORDER, orders[i])
                }
            })

        RestService.get('/crypto_margin/'+account.id+'/positions')
            .then(positions => {
                for(let i in positions) {
                    this.commit(MARGIN_POSITION, positions[i])
                }
            })
    },

    [ORDER](context, order) {
        switch (order.status) {
            case 'NEW':
                return
            case 'ACTIVE':
            case 'PARTIALLY_FILLED':
                Vue.set(state.orders, order.id, order)
                break
            case 'FILLED':
            case 'CANCELLED':
                Vue.delete(state.orders, order.id)

                state.history.unshift(order)
                state.historyLen++

                break
            default:
                return
        }
    },

    [MARGIN_ORDER](context, order) {
        switch (order.status) {
            case 'NEW':
                return
            case 'ACTIVE':
            case 'PARTIALLY_FILLED':
                Vue.set(state.marginOrders, order.id, order)
                break
            case 'FILLED':
            case 'CANCELLED':
                Vue.delete(state.orders, order.id)
                break
            default:
                return
        }
    },

    [MARGIN_POSITION](context, position) {
        if (position.leverage === 0) {
            if (position.quantity === 0) {
                Vue.delete(state.marginPositions, position.symbol)
            } else {
                Vue.set(state.marginPositions, position.symbol, position)
            }
        } else {
            if (position.quantity === 0) {
                Vue.delete(state.marginPositions, position.id)
            } else {
                Vue.set(state.marginPositions, position.id, position)
            }
        }
    },

    [BALANCE_UPDATE](context, balance) {
        if (state.wallets[balance.currency] !== undefined) {
            Vue.set(state.wallets[balance.currency], 'balance', state.wallets[balance.currency].balance + balance.amount)
        } else {
            state.wallets[balance.currency] = {
                precision: balance.precision,
                balance: balance.amount,
                currency: balance.currency
            }
        }
        state.account[balance.account_id].balance += balance.amount
    },

    [LOGOUT]() {
        Vue.set(state, 'accounts', {})
        Vue.set(state, 'marginAccounts', {})
        Vue.set(state, 'orders', {})
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
