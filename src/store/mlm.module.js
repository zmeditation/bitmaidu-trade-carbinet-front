import Vue from 'vue'
import RestService from "@/common/rest.service";
import {MLM_PAYOUTS, MLM_REFERRALS} from "@/store/mutations.type";
import {MLM_PAYOUTS_GET, MLM_REFERRALS_GET} from "@/store/actions.type";

const state = {
    mlmPayouts: [],
    mlmReferrals: []
}

const getters = {
    mlmPayouts() {
        return state.mlmPayouts
    },

    mlmReferrals() {
        return state.mlmReferrals
    }
}

const actions = {
    [MLM_PAYOUTS_GET]() {
        RestService.get('/crypto_mlm/payouts')
            .then(documents => {
                this.commit(MLM_PAYOUTS, documents.rows)
            })
    },

    [MLM_REFERRALS_GET]() {
        RestService.get('/crypto_mlm/referrals')
            .then(documents => {
                this.commit(MLM_REFERRALS, documents.rows)
            })
    }
}

const mutations = {
    [MLM_PAYOUTS](context, payouts) {
        for(let i in payouts) {
            payouts[i].timeCreatedString = new Date(payouts[i].time_created*1000).toLocaleString()
        }
        payouts.reverse()
        Vue.set(state, 'mlmPayouts', payouts)
    },

    [MLM_REFERRALS](context, referrals) {
        for(let i in referrals) {
            referrals[i].timeCreatedString = new Date(referrals[i].created*1000).toLocaleString()
        }
        Vue.set(state, 'mlmReferrals', referrals)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}