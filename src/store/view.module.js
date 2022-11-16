import {
    MODAL_CABINET,
    MODAL_LOGIN, MODAL_REGISTER,
    NOTIFICATION,
    USER
} from "@/store/mutations.type"
import {APP_INIT} from "@/store/actions.type";

const state = {
    modalLoginActive: false,
    modalCabinetActive: false,
    modalRegisterActive: false
}

const getters = {
    modalLoginActive() {
        return state.modalLoginActive
    },

    modalCabinetActive() {
        return state.modalCabinetActive
    },

    modalRegisterActive() {
        return state.modalRegisterActive
    }
}

const actions = {
    [APP_INIT]() {
        let toks = window.location.pathname.split('/')

        switch (toks[2]) {
            case 'r':
                window.localStorage.setItem('referrer', toks[3])
                this.commit(MODAL_REGISTER, true)
                break
            case 'login':
                this.commit(MODAL_LOGIN, true)
                break
        }
    }
}

const mutations = {
    [USER]() {
        this.commit(MODAL_LOGIN, false)
    },

    [MODAL_LOGIN](context, val) {
        state.modalLoginActive = val
    },

    [MODAL_CABINET](context, val) {
        state.modalCabinetActive = val
    },

    [MODAL_REGISTER](context, val) {
        state.modalRegisterActive = val
    },

    [NOTIFICATION](context, msg) {
        console.log(msg)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
