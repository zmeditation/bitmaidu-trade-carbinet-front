import Vue from 'vue'
import RestService from "@/common/rest.service";
import {
    API_KEY_REMOVE,
    API_KEY_REQUEST,
    API_KEYS_GET,
    APP_INIT,
    DEPOSIT_REQUEST,
    DEPOSITS_GET, DOCUMENT_UPLOAD, DOCUMENTS_GET,
    LOGIN,
    LOGOUT, PASSWORD_CHANGE, PERSONAL_UPDATE, REGISTER,
    WITHDRAWAL_REQUEST,
    WITHDRAWALS_GET
} from "@/store/actions.type";
import {
    CRYPTO_API_KEY_NEW,
    CRYPTO_API_KEYS,
    DEPOSIT_ADDRESS,
    DEPOSITS, DOCUMENTS, MODAL_LOGIN, MODAL_REGISTER,
    NOTIFICATION,
    USER,
    WITHDRAWALS
} from "@/store/mutations.type";
//import {timeToString} from "@/common/helpers";

const state = {
    loggedIn: false,
    token: null,
    user: {
        firstname: '',
        lastname: '',
        fullname: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        address: '',
        postcode: ''
    },
    deposits: [],
    withdrawals: [],
    documents: [],
    apiKeys: [],
    apiKeyNew: '',
    depositAddress: ''
}

const getters = {
    loggedIn() {
        return state.loggedIn
    },

    user() {
        return state.user
    },

    deposits() {
        return state.deposits
    },

    withdrawals() {
        return state.withdrawals
    },

    documents() {
        return state.documents
    },

    apiKeys() {
        return state.apiKeys
    },

    apiKeyNew() {
        return state.apiKeyNew
    },

    depositAddress() {
        return state.depositAddress
    }
}

const actions = {
    [APP_INIT]() {
        state.token = window.localStorage.getItem('token')

        if (state.token === undefined || state.token === 'undefined' || state.token === null || state.token === 'null') {
            window.localStorage.removeItem('token')
        } else {
            RestService.token(state.token)
            RestService.get('/user')
                .then(user => {
                    user.jwt_token = state.token
                    this.commit(USER, user)
                })
        }
    },

    [LOGIN](context, data) {
        RestService.post('/auth', data)
            .then(user => {
                RestService.token(user.jwt_token)
                window.localStorage.setItem('token', user.jwt_token)

                this.commit(USER, user)
            })
    },

    [REGISTER](context, data) {
        data.referrer = window.localStorage.getItem('referrer') || 0
        RestService.post('/user', data)
            .then(() => {
                this.commit(NOTIFICATION, 'Account has been registered. You may login now')

                this.commit(MODAL_REGISTER, false)
                this.commit(MODAL_LOGIN, true)
            })
    },

    [PERSONAL_UPDATE](context, user) {
        RestService.put('/user', user)
            .then(() => {
                this.commit(NOTIFICATION, 'Personal details have been updated')

                let nUser = {
                    ...state.user
                }

                for (let n in user) {
                    nUser[n] = user[n]
                }

                this.commit(USER, nUser)
            })
    },

    [PASSWORD_CHANGE](context, pass) {
        RestService.put('/user/password', pass)
            .then(() => {
                this.commit(NOTIFICATION, 'Password has been changed')
            })
    },

    [DEPOSIT_REQUEST](context, data) {
        RestService.get('/psp/nax/wallet', data)
            .then(res => {
                if (res.wallet) {
                    this.commit(DEPOSIT_ADDRESS, res.wallet)
                }
            })
    },

    [DEPOSITS_GET]() {
        RestService.get('/transactions/deposits')
            .then(deposits => {
                this.commit(DEPOSITS, deposits.rows)
            })
    },

    [WITHDRAWAL_REQUEST](context, data) {
        data.product = 'crypto'
        data.account_id = context.getters.account.id
        data.balance = 'balance'
        RestService.post('/transactions/withdrawals', data)
            .then(() => {
                this.commit(NOTIFICATION, 'Withdrawal request has been sent')
                this.dispatch(WITHDRAWALS_GET)
            })
    },

    [WITHDRAWALS_GET]() {
        RestService.get('/transactions/withdrawals')
            .then(deposits => {
                this.commit(WITHDRAWALS, deposits.rows)
            })
    },

    [DOCUMENT_UPLOAD](context, data) {
        RestService.post('/kyc/documents', data)
            .then(() => {
                this.commit(NOTIFICATION, 'Document successfully uploaded')
                this.dispatch(DOCUMENTS_GET)
            })
    },

    [DOCUMENTS_GET]() {
        RestService.get('/kyc/documents')
            .then(documents => {
                this.commit(DOCUMENTS, documents.rows)
            })
    },

    [API_KEY_REQUEST](context, key) {
        RestService.post('/crypto_api/keys', {
            rights: key.rights
        })
            .then(newKey => {
                this.commit(CRYPTO_API_KEY_NEW, newKey.key)
                this.dispatch(API_KEYS_GET)
            })
    },

    [API_KEY_REMOVE](context, id) {
        RestService.delete('/crypto_api/key/'+id)
            .then(() => {
                this.dispatch(API_KEYS_GET)
            })
    },

    [API_KEYS_GET]() {
        RestService.get('/crypto_api/keys')
            .then(keys => {
                this.commit(CRYPTO_API_KEYS, keys)
            })
    },

    [LOGOUT]() {
        window.localStorage.removeItem('token')
        RestService.token('')

        this.commit(LOGOUT)
    }
}

const mutations = {
    [USER](context, user) {
        state.user = user
        state.loggedIn = true
    },

    [DEPOSIT_ADDRESS](context, wallet) {
        state.depositAddress = wallet
    },

    [DEPOSITS](context, deposits) {
        for(let i in deposits) {
            deposits[i].timeCreatedString = new Date(deposits[i].time_created*1000).toLocaleString()
        }
        deposits.reverse()
        Vue.set(state, 'deposits', deposits)
    },

    [WITHDRAWALS](context, withdrawals) {
        for(let i in withdrawals) {
            withdrawals[i].timeCreatedString = new Date(withdrawals[i].time_created*1000).toLocaleString()
        }
        withdrawals.reverse()
        Vue.set(state, 'withdrawals', withdrawals)
    },

    [DOCUMENTS](context, documents) {
        for(let i in documents) {
            documents[i].timeCreatedString = new Date(documents[i].time_created*1000).toLocaleString()
        }
        documents.reverse()
        Vue.set(state, 'documents', documents)
    },

    [CRYPTO_API_KEYS](context, keys) {
        for(let i in keys) {
            keys[i].timeCreatedString = new Date(keys[i].time_created*1000).toLocaleString()
        }
        keys.reverse()
        Vue.set(state, 'apiKeys', keys)
    },

    [CRYPTO_API_KEY_NEW](context, key) {
        state.apiKeyNew = key
    },

    [LOGOUT]() {
        state.loggedIn = false

        state.token = null

        state.user = {
            fullname: ''
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
