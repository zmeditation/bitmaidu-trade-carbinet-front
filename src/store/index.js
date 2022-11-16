import Vue from "vue"
import Vuex from "vuex"

import user from "./user.module"
import markets from "./markets.module"
import trade from "./trade.module"
import view from "./view.module"
import io from "./io.module"

import mlm from "./mlm.module"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        markets,
        trade,
        view,
        io,
        mlm
    }
})
