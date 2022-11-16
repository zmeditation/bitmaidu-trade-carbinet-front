import Vue from 'vue';
import {APP_INIT} from "@/store/actions.type";
import RestService from "@/common/rest.service";
import {
    CURRENCY,
    MARKETS,
    SYMBOL
} from "@/store/mutations.type";
import {SYMBOL_DEFAULT} from "@/common/config";

const state = {
    markets: {
        [SYMBOL_DEFAULT]: {
            price: 0,
            precision: 2,
            base_currency: '',
            foreign_currency: '',
            alias: '/',
            quote: {
                symbol: '',
                bid: 0,
                ask: 0,
                volume: 0,
                volume24h: 0,
                trend: 0,
                change: 0,
                changePct: 0,
                changeDir: 0
            }
        }
    },
    currencies: {},
    symActive: SYMBOL_DEFAULT
}

const getters = {
    markets() {
        return state.markets
    },

    currencies() {
        return state.currencies
    },

    quote() {
        return state.markets[state.symActive].quote
    }
}

const actions = {
    [APP_INIT]() {
        RestService.get('/crypto/symbols')
            .then(symbols => {
                for(let i in symbols) {
                    this.commit(SYMBOL, symbols[i])
                }
            })

        RestService.get('/crypto/currencies')
            .then(currencies => {
                for(let i in currencies) {
                    this.commit(CURRENCY, currencies[i])
                }
            })
    }
}

const mutations = {
    [SYMBOL](context, symbol) {
        symbol.quote.changeDir = 0
        Vue.set(state.markets, symbol.symbol, symbol)
    },

    [CURRENCY](context, currency) {
        Vue.set(state.currencies, currency.currency, currency)
    },

    [MARKETS](context, markets) {
        for(let sym in markets) {
            if (state.markets[sym] !== undefined) {
                if (state.markets[sym].quote.bid > markets[sym].bid) {
                    markets[sym].changeDir = -1
                } else if (state.markets[sym].quote.bid < markets[sym].bid) {
                    markets[sym].changeDir = 1
                } else {
                    markets[sym].changeDir = state.markets[sym].quote.changeDir
                }
                Vue.set(state.markets[sym], 'quote', markets[sym])
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
